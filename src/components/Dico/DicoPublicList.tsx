import { useState, useMemo } from "react";
import type { FC } from "react";
import type { Word } from "../../interfaces/dico/word";
import { ItemDico } from "./ItemDico";
import { ToolbarDicoPublic } from "./ToolbarDicoPublic";

export const DicoPublic: FC<{ words: Word[]; }> = ({ words }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [fontSize, setFontSize] = useState<number>(18);
  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      const matchesQuery =
        w.sourceWord.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.translationWord.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || w.wordType === filterType;
      return matchesQuery && matchesType;
    });
  }, [words, searchQuery, filterType]);

  return (
    <div className="flex-1 px-3 py-4 min-h-screen">
      {/* Toolbar */}
      <ToolbarDicoPublic
        onSearch={setSearchQuery}
        onFilterType={setFilterType}
        onFontSizeChange={setFontSize}
      />

      {/* Liste */}
      {filteredWords.length > 0 ? (
        <div className="flex flex-col gap-3 lg:items-center">
          {filteredWords.map((word, idx) => (
            <ItemDico key={idx} word={word} initialFontSize={fontSize} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Aucun mot ne correspond à votre recherche.
        </p>
      )}
    </div>
  );
};
