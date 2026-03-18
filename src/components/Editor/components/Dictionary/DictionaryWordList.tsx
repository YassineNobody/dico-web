import { useState, useMemo } from "react";
import { Editor } from "@tiptap/react";
import { Search } from "lucide-react";
import { useDico } from "../../../../hooks/useDico";

type Mode = "public" | "private";

type Props = {
  editor: Editor;
  mode: Mode;
};

export const DictionaryWordList = ({ editor, mode }: Props) => {
  const { dicoPublic, dicoPrivate } = useDico();

  const [query, setQuery] = useState("");

  const words = mode === "public" ? dicoPublic : dicoPrivate;

  const filteredWords = useMemo(() => {
    if (!query) return words;

    const q = query.toLowerCase();

    return words.filter(
      (w) =>
        w.sourceWord.toLowerCase().includes(q) ||
        w.translationWord.toLowerCase().includes(q),
    );
  }, [query, words]);

  const insertWord = (word: string) => {
    editor
      .chain()
      .focus()
      .insertContent(word + " ")
      .run();
  };

  return (
    <div className="flex flex-col gap-3">
      {/* SEARCH */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un mot..."
          className="w-full pl-7 pr-2 py-1 border rounded text-sm bg-white dark:bg-gray-800"
        />
      </div>

      {/* WORD LIST */}
      <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto">
        {filteredWords.map((word) => (
          <button
            key={word.id}
            onClick={() => insertWord(word.sourceWord)}
            className="text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="flex justify-between text-lg">
              <span className="font-semibold">{word.sourceWord}</span>

              <span className="text-gray-500 dark:text-gray-400">
                {word.translationWord}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
