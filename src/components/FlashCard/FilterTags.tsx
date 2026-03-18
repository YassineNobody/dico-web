import { X } from "lucide-react";

type Props = {
  themes: string[];
  limit: number;
  onRemoveTheme: (theme: string) => void;
};

const FilterTags = ({ themes, limit, onRemoveTheme }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 font-montserrat">

      {/* LIMIT TAG */}
      <div className="flex items-center gap-1 px-3 py-1 text-sm rounded-md border
      bg-gray-100 border-gray-300
      dark:bg-neutral-800 dark:border-neutral-700">
        {limit} cartes
      </div>

      {/* THEMES TAGS */}
      {themes.map((theme) => (
        <div
          key={theme}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded-md border
          bg-gray-100 border-gray-300
          dark:bg-neutral-800 dark:border-neutral-700"
        >
          {theme}

          <button
            onClick={() => onRemoveTheme(theme)}
            className="ml-1 text-gray-500 hover:text-black dark:hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      ))}

    </div>
  );
};

export default FilterTags;