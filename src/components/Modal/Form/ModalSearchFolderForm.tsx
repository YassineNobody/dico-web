import { useState } from "react";
import { useFolders } from "../../../hooks/useFolders";
import { Search, X } from "lucide-react";

type Props = {
  onClose: () => void;
  setSearchQuery: (query: string) => void;
};

export const ModalSearchFolderForm = ({ onClose, setSearchQuery }: Props) => {
  const { folders } = useFolders();
  const [query, setQuery] = useState("");

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.length > 0) {
      setSearchQuery(query);
      onClose();
    }
  };

  const resetSearch = () => {
    setQuery("");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* INPUT */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Rechercher un dossier..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border w-full pl-9 pr-9 py-2 rounded"
        />

        {query.length > 0 && (
          <X
            size={18}
            onClick={resetSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-black"
          />
        )}
      </div>

      {/* RESULTATS */}
      {query.length > 0 && (
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto border rounded">
          {filteredFolders.length > 0 ? (
            filteredFolders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => {
                  setSearchQuery(folder.name);
                  onClose();
                }}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {folder.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-sm text-gray-500">
              Aucun dossier trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
};
