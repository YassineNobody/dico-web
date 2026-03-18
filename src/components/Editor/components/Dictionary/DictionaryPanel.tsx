import { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { BookA, X } from "lucide-react";
import { DictionaryMenu } from "./DictionaryMenu";
import { DictionaryWordList } from "./DictionaryWordList";
import { DictionaryThemes } from "./DictionaryThemes";

type Mode = "public" | "private" | "themes";

type Props = {
  editor: Editor;
};

export const DictionaryPanel = ({ editor }: Props) => {
  const [isOpen, setIsOpen] = useState(editor.storage.dictionary.isOpen);
  const [mode, setMode] = useState<Mode>("public");

  /*
  =========================
  LISTEN EDITOR TRANSACTION
  =========================
  */

  useEffect(() => {
    const update = () => {
      setIsOpen(editor.storage.dictionary.isOpen);
    };

    editor.on("transaction", update);

    return () => {
      editor.off("transaction", update);
    };
  }, [editor]);

  /*
  =========================
  BLOCK BODY SCROLL MOBILE
  =========================
  */

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;

    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  /*
  =========================
  UI
  =========================
  */

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-55 lg:hidden"
          onClick={() => editor.commands.closeDictionary()}
        />
      )}

      {/* PANEL */}
      <div
        className={`
        fixed lg:absolute
        top-0 right-0
        h-full w-full lg:w-80
        bg-white dark:bg-neutral-900
        border-l shadow-lg
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        z-100 flex flex-col
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex flex-row items-center gap-1">
            <BookA size={18} />
            <span className="font-semibold font-montserrat">Dictionnaire</span>
          </div>

          <button
            onClick={() => editor.commands.closeDictionary()}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <div className="p-3 border-b">
          <DictionaryMenu onChange={setMode} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-3 overflow-y-auto">
          {mode !== "themes" && (
            <DictionaryWordList editor={editor} mode={mode} />
          )}

          {mode === "themes" && <DictionaryThemes editor={editor} />}
        </div>
      </div>
    </>
  );
};
