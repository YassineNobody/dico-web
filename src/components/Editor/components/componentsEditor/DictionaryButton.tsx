import { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import { BookOpen } from "lucide-react";

export const DictionaryButton = ({ editor }: { editor: Editor }) => {
  const [isOpen, setIsOpen] = useState(editor.storage.dictionary.isOpen);

  useEffect(() => {
    const update = () => {
      setIsOpen(editor.storage.dictionary.isOpen);
    };

    editor.on("transaction", update);

    return () => {
      editor.off("transaction", update);
    };
  }, [editor]);

  const toggleDictionary = () => {
    if (isOpen) {
      editor.commands.closeDictionary();
    } else {
      editor.commands.openDictionary();
    }
  };

  return (
    <button
      onClick={toggleDictionary}
      className={`p-2 rounded transition
        ${
          isOpen
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
    >
      <BookOpen size={18} />
    </button>
  );
};
