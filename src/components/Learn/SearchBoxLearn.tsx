import { Search, X } from "lucide-react";
import { useState, type FC, useEffect } from "react";

interface SearchBoxLearnProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export const SearchBoxLearn: FC<SearchBoxLearnProps> = ({
  placeholder = "Rechercher une leçon...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(query.trim());
    }, 250); // léger délai pour éviter le spam
    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-md mt-6">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg shadow-sm 
                   focus:ring-2 focus:ring-amber-400 focus:border-amber-400 
                   outline-none dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          aria-label="Effacer la recherche"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};
