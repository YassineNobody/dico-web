import { useState } from "react";
import { FolderPlus, FolderSearch, X } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { ModalCreateFolderForm } from "../../components/Modal/Form/ModalCreateFolder";
import { ModalSearchFolderForm } from "../../components/Modal/Form/ModalSearchFolderForm";
import { useFolders } from "../../hooks/useFolders";
import { FolderItem } from "../../components/Folder/FolderItem";

const FolderPage = () => {
  const { showModal, hideModal } = useModal();
  const { folders } = useFolders();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const openModalCreateFolder = () => {
    showModal({
      title: "Créer un dossier",
      Component: ModalCreateFolderForm,
      props: {
        onClose: hideModal,
      },
    });
  };

  const openModalSearchFolder = () => {
    showModal({
      title: "Rechercher un dossier",
      Component: ModalSearchFolderForm,
      props: {
        onClose: hideModal,
        setSearchQuery,
      },
    });
  };

  const resetSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="pt-26 flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* HEADER */}
      <div className="flex flex-row justify-between px-4 items-center">
        <h1 className="text-xl font-montserrat">Mes dossiers</h1>

        <div className="flex flex-row gap-2">
          <FolderSearch
            size={22}
            className="cursor-pointer"
            onClick={openModalSearchFolder}
          />

          <FolderPlus
            size={22}
            className="cursor-pointer"
            onClick={openModalCreateFolder}
          />
        </div>
      </div>

      {/* TAG RECHERCHE */}
      {searchQuery && (
        <div className="px-4 pt-3 flex items-center gap-2">
          <span className="text-sm text-gray-500">Recherche :</span>

          <div className="flex items-center gap-1 bg-gray-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-sm">
            {searchQuery}

            <X
              size={14}
              className="cursor-pointer opacity-70 hover:opacity-100"
              onClick={resetSearch}
            />
          </div>
        </div>
      )}

      {/* LISTE DOSSIERS */}
      <div className="flex flex-col gap-3 p-4">
        {filteredFolders.length > 0 ? (
          filteredFolders.map((folder) => (
            <FolderItem key={folder.id} folder={folder} />
          ))
        ) : (
          <div className="text-sm text-gray-400">Aucun dossier trouvé</div>
        )}
      </div>
    </div>
  );
};

export default FolderPage;
