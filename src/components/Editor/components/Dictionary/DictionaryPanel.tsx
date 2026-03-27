import { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { Transaction } from "@tiptap/pm/state";
import { BookA, X } from "lucide-react";
import { DictionaryMenu } from "./DictionaryMenu";
import { DictionaryWordList } from "./DictionaryWordList";
import { DictionaryThemes } from "./DictionaryThemes";

type Mode = "public" | "private" | "themes";

type Props = {
  editor: Editor;
};

export const DictionaryPanel = ({ editor }: Props) => {
  // ✅ FIX : toujours fermé au départ
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("public");

  /*
  =========================
  FORCE CLOSE AU MOUNT (BONUS)
  =========================
  */

  useEffect(() => {
    editor.commands.closeDictionary();
  }, [editor]);

  /*
  =========================
  LISTEN EDITOR TRANSACTION
  =========================
  */

  useEffect(() => {
    const update = ({ transaction }: { transaction: Transaction }) => {
      const meta = transaction.getMeta("dictionary");

      if (meta && typeof meta.isOpen === "boolean") {
        setIsOpen(meta.isOpen);
      }
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
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleChange = () => {
      if (mediaQuery.matches && isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      document.body.style.overflow = "auto";
      mediaQuery.removeEventListener("change", handleChange);
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
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => editor.commands.closeDictionary()}
        />
      )}

      {/* PANEL */}
      <div
        className={`
    fixed
    top-28 right-0
    h-full w-full lg:w-80
    bg-gray-50 dark:bg-neutral-900
    border-l shadow-lg
    transition-all duration-300
    ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
    ${!isOpen ? "pointer-events-none" : ""}
    z-50 flex flex-col
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
          {mode !== "themes" && <DictionaryWordList mode={mode} />}

          {mode === "themes" && <DictionaryThemes />}
        </div>
      </div>
    </>
  );
};
