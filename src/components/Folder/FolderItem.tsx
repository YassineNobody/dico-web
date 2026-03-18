import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDown, Eye, Folder, Pencil, Trash2 } from "lucide-react";
import type { FolderMenu } from "../../interfaces/folder/folder";
import { useModal } from "../../hooks/useModal";
import { ModalUpdateFolderForm } from "../Modal/Form/ModalUpdateFolderForm";
import { useModalConfirm } from "../../hooks/useModalConfirmation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder } from "../../services/folders";
import { useNavigate } from "react-router-dom";

type Props = {
  folder: FolderMenu;
};

export const FolderItem = ({ folder }: Props) => {
  const { showModal, hideModal } = useModal();
  const { confirm, ConfirmDialog } = useModalConfirm();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: (slug: string) => deleteFolder(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const openModalUpdateFolder = (folder: FolderMenu) => {
    showModal({
      title: "Modifier le dossier",
      Component: ModalUpdateFolderForm,
      props: {
        folder,
        onClose: hideModal,
      },
    });
  };

  const handleDeleteFolder = async (folder: FolderMenu) => {
    const confirmed = await confirm({
      title: "Supprimer le dossier",
      message: `Voulez-vous supprimer le dossier "${folder.name}" ?`,
      confirmText: "Supprimer",
      cancelText: "Annuler",
      icon: "error",
    });

    if (!confirmed) return;

    await deleteMutation(folder.slug);
  };

  return (
    <>
      <Disclosure as="div" className="border rounded-lg overflow-hidden">
        {({ open }) => (
          <>
            <DisclosureButton className="flex items-center justify-between w-full p-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
              {/* gauche */}
              <div className="flex items-center gap-2">
                <Folder size={18} />
                <span className="font-medium">{folder.name}</span>
              </div>

              {/* droite */}
              <div className="flex items-center gap-3">
                <Eye
                  size={16}
                  className="cursor-pointer opacity-70 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/folders/${folder.slug}`);
                  }}
                />
                {/* edit */}
                <Pencil
                  size={16}
                  className="cursor-pointer text-blue-700 opacity-70 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModalUpdateFolder(folder);
                  }}
                />

                {/* delete */}
                <Trash2
                  size={16}
                  className="cursor-pointer text-red-500 opacity-70 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFolder(folder);
                  }}
                />

                {/* accordion */}
                <ChevronDown
                  size={18}
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
              </div>
            </DisclosureButton>

            <DisclosurePanel className="px-3 pb-3 pt-1 flex flex-col gap-2 text-sm">
              {folder.texts.length === 0 ? (
                <span className="text-gray-400">Aucun fichier</span>
              ) : (
                folder.texts.map((text) => (
                  <div
                    key={text.slug}
                    className="cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/folders/${folder.slug}/${text.slug}`);
                    }}
                  >
                    {text.title}
                  </div>
                ))
              )}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      <ConfirmDialog />
    </>
  );
};
