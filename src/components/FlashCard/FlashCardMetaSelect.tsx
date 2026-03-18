import { Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useWordsThemes } from "../../hooks/useWordsThemes";

type Props = {
  themes: string[];
  limit: number;
  onChange: (data: { themes: string[]; limit: number }) => void;
};

const FlashCardMetaSelect = ({ themes, limit, onChange }: Props) => {
  const { wordsThemes: themesList } = useWordsThemes();
  const [search, setSearch] = useState("");

  const filteredThemes = useMemo(() => {
    return themesList.filter((t) =>
      t.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, themesList]);

  const handleLimitChange = (value: number) => {
    onChange({ themes, limit: value });
  };

  const handleThemeChange = (value: string) => {
    const updated = themes.includes(value)
      ? themes.filter((t) => t !== value)
      : [...themes, value];

    onChange({ themes: updated, limit });
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-6 w-full">
      {/* LIMIT */}
      <div className="flex flex-col gap-2 md:min-w-[180px]">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Nombre de cartes
        </label>

        <select
          value={limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="rounded-md border px-3 py-2 text-sm
          bg-white text-gray-900 border-gray-300
          focus:outline-none focus:ring-2 focus:ring-black
          dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
        >
          {[5, 6, 7, 8, 9].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
          {[10, 11, 12, 13, 14].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
          {[15, 16, 17, 18, 19, 20].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* THEMES */}
      <div className="flex flex-col gap-2 md:max-w-[450px] w-full">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Thèmes
        </label>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Rechercher un thème..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border pl-9 pr-9 py-2 text-sm
            bg-white text-gray-900 border-gray-300
            focus:outline-none focus:ring-2 focus:ring-black
            dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1">
          {filteredThemes.map((theme) => {
            const selected = themes.includes(theme);

            return (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`px-3 py-1.5 text-sm rounded-md border shrink-0 transition-colors
                ${
                  selected
                    ? "bg-black text-white border-black dark:bg-white dark:text-black"
                    : `bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200
                       dark:bg-neutral-800 dark:text-gray-200 dark:border-neutral-700 dark:hover:bg-neutral-700`
                }`}
              >
                {theme}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlashCardMetaSelect;
