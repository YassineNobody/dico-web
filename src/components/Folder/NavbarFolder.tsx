import type { FC } from "react";
import type { FolderMenu } from "../../interfaces/folder/folder";
import { useModal } from "../../hooks/useModal";
import { useModalConfirm } from "../../hooks/useModalConfirmation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModalUpdateFolderForm } from "../Modal/Form/ModalUpdateFolderForm";
import { deleteFolder } from "../../services/folders";
import { ArrowLeft, FilePlus, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createTextFolder } from "../../services/textFolder";

export const NavbarFolder: FC<{ folder: FolderMenu }> = ({ folder }) => {
  const { showModal, hideModal } = useModal();
  const { confirm, ConfirmDialog } = useModalConfirm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: (slug: string) => deleteFolder(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      navigate("/folders", { replace: true });
    },
  });

  const { mutateAsync: createTextFolderMutation } = useMutation({
    mutationFn: async ({ title }: { title: string }) =>
      await createTextFolder({
        title,
        folderId: folder.id,
        content: " ",
      }),

    onSuccess: (data) => {
      queryClient.setQueryData<FolderMenu[]>(["folders"], (old) => {
        if (!old) return old;

        return old.map((f) =>
          f.id === folder.id
            ? {
                ...f,
                texts: [...f.texts, { title: data.title, slug: data.slug }],
              }
            : f,
        );
      });
    },
  });
  
  const handleCreateTextFolder = async () => {
    let base = "untitled";
    let title = base;
    let count = 1;

    const existingTitles = folder.texts.map((t) => t.title.toLowerCase());

    while (existingTitles.includes(title)) {
      title = `${base}-${count}`;
      count++;
    }

    const text = await createTextFolderMutation({ title });

    navigate(`/folders/${folder.slug}/${text.slug}`);
  };

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
    <div className="py-3 px-4 flex flex-row items-center justify-between rounded-lg">
      <div className="flex flex-row items-center gap-3">
        <Link to={"/folders"}>
          <ArrowLeft size={18} />
        </Link>
        <span className="text-xl capitalize font-montserrat font-light">
          {folder.name}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <FilePlus
          size={20}
          className="cursor-pointer  opacity-70 hover:opacity-100"
          onClick={handleCreateTextFolder}
        />
        <Pencil
          size={20}
          className="cursor-pointer text-blue-700 opacity-70 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            openModalUpdateFolder(folder);
          }}
        />

        {/* delete */}
        <Trash2
          size={20}
          className="cursor-pointer text-red-500 opacity-70 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteFolder(folder);
          }}
        />
      </div>

      <ConfirmDialog />
    </div>
  );
};
