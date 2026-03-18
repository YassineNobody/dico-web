import { useState, useMemo } from "react";
import { Editor } from "@tiptap/react";
import { Bookmark, Search } from "lucide-react";
import { useWordsThemes } from "../../../../hooks/useWordsThemes";
import { useWordsByTheme } from "../../../../hooks/useWordsByTheme";
import { LoadingMessage } from "../../../Loader/LoadingMessage";

type Props = {
  editor: Editor;
};

export const DictionaryThemes = ({ editor }: Props) => {
  const { wordsThemes } = useWordsThemes();

  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const { data: words = [], isLoading } = useWordsByTheme(selectedTheme);

  /*
  =========================
  INSERT WORD
  =========================
  */

  const insertWord = (word: string) => {
    editor
      .chain()
      .focus()
      .insertContent(word + " ")
      .run();
  };

  /*
  =========================
  FILTER WORDS
  =========================
  */

  const filteredWords = useMemo(() => {
    if (!query) return words;

    const q = query.toLowerCase();

    return words.filter(
      (w) =>
        w.sourceWord.toLowerCase().includes(q) ||
        w.translationWord.toLowerCase().includes(q),
    );
  }, [query, words]);

  /*
  =========================
  LIST THEMES
  =========================
  */

  if (!selectedTheme) {
    return (
      <div className="flex flex-col gap-2">
        {wordsThemes.map((theme) => (
          <button
            key={theme}
            onClick={() => setSelectedTheme(theme)}
            className="text-left flex flex-row items-center gap-2 capitalize p-2 font-light rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <Bookmark size={16} />
            <span>{theme}</span>
          </button>
        ))}
      </div>
    );
  }

  /*
  =========================
  LOADING
  =========================
  */

  if (isLoading) {
    return (
      <div className="text-sm flex flex-col justify-center items-center h-full text-gray-500">
        <LoadingMessage />
      </div>
    );
  }

  /*
  =========================
  WORD LIST
  =========================
  */

  return (
    <div className="flex flex-col gap-3">
      {/* BACK */}
      <button
        onClick={() => {
          setSelectedTheme(null);
          setQuery("");
        }}
        className="text-sm text-blue-500 hover:underline"
      >
        ← Retour aux thèmes
      </button>

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

      {/* WORDS */}
      <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto">
        {filteredWords.map((word) => (
          <button
            key={word.id}
            onClick={() => insertWord(word.sourceWord)}
            className="text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="flex justify-between text-lg">
              <span className="font-semibold">{word.sourceWord}</span>

              <span className="text-sm text-gray-500 dark:text-gray-400">
                {word.translationWord}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
