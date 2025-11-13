import { useState } from "react";
import { Search, Filter, Type, Plus, Minus, X } from "lucide-react";
import { WordType } from "../../interfaces/dico/word";

interface ToolbarDicoPublicProps {
  onSearch: (query: string) => void;
  onFilterType: (type: string) => void;
  onFontSizeChange: (size: number) => void;
}

export const ToolbarDicoPublic = ({
  onSearch,
  onFilterType,
  onFontSizeChange,
}: ToolbarDicoPublicProps) => {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [fontSize, setFontSize] = useState<number>(18);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setQuery("");
    onSearch("");
  };

  const handleFilter = (value: string) => {
    setSelectedType(value);
    onFilterType(value);
  };

  const handleFontSize = (newValue: number) => {
    const size = Math.max(14, Math.min(50, newValue));
    setFontSize(size);
    onFontSizeChange(size);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`
    flex flex-col sm:flex-row flex-wrap justify-between items-center
    gap-2 bg-white dark:bg-gray-800 border border-gray-200
  dark:border-gray-700 rounded-lg p-3 shadow-sm mb-4
    w-full lg:max-w-4xl
  `}
      >
        {/* 🔍 Barre de recherche */}
        <div className="relative flex items-center gap-2 w-full sm:w-1/2 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1.5 bg-gray-50 dark:bg-gray-700">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Rechercher un mot..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400 text-sm"
          />

          {query && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              aria-label="Effacer la recherche"
            >
              <X size={16} className="text-gray-500 dark:text-gray-300" />
            </button>
          )}
        </div>

        {/* 🧩 Filtre par type */}
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select
            value={selectedType}
            onChange={(e) => handleFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm px-3 font-montserrat py-1.5 focus:outline-none"
          >
            <option value="all">Tous les types</option>
            <option value={WordType.noun}>Nom</option>
            <option value={WordType.verb}>Verbe</option>
            <option value={WordType.adjective}>Adjectif</option>
            <option value={WordType.adverb}>Adverbe</option>
            <option value={WordType.preposition}>Préposition</option>
            <option value={WordType.pronoun}>Pronom</option>
            <option value={WordType.suffix}>Suffixe</option>
            <option value={WordType.other}>Autre</option>
          </select>
        </div>

        {/* 🔠 Taille du texte (avec boutons + / -) */}
        <div className="flex items-center gap-2">
          <Type size={18} className="text-gray-500" />
          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-gray-50 dark:bg-gray-700">
            <button
              onClick={() => handleFontSize(fontSize - 2)}
              disabled={fontSize <= 14}
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-40"
            >
              <Minus size={14} />
            </button>

            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 w-6 text-center">
              {fontSize}
            </span>

            <button
              onClick={() => handleFontSize(fontSize + 2)}
              disabled={fontSize >= 50}
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-40"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Ajout rapide */}
      </div>
    </div>
  );
};
