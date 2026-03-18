import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { CreateFolder } from "../../../interfaces/folder/folder";
import { createFolder } from "../../../services/folders";
import { useFolders } from "../../../hooks/useFolders";
import { useState } from "react";
import type { ErrorResponse } from "../../../interfaces/common";
import SpinnerLoader from "../../Spinner/Loader";

export const ModalCreateFolderForm = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const [errorDuplicate, setErrorDuplicate] = useState<boolean>(false);

  const { folders } = useFolders();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFolder>();

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async (data: CreateFolder) => await createFolder(data),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      onClose();
    },
  });

  const onSubmit = async (data: CreateFolder) => {
    setErrorDuplicate(false);

    if (
      folders.find(
        (p) => p.name.toLowerCase().trim() === data.name.trim().toLowerCase(),
      )
    ) {
      setErrorDuplicate(true);
      return;
    }

    await mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-3">
      {/* ⚠️ Erreur API */}
      {isError && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 rounded-md px-3 py-2">
          {(error as unknown as ErrorResponse)?.message ??
            "Une erreur interne est survenue."}
        </div>
      )}

      {/* ⚠️ Erreur duplicate */}
      {errorDuplicate && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 rounded-md px-3 py-2">
          Un dossier avec ce nom existe déjà.
        </div>
      )}

      {/* 📁 Nom du dossier */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Nom du dossier</label>

        <input
          type="text"
          placeholder="Ex : Vocabulaire coran"
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-900
                     text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-amber-500
                     focus:border-amber-500
                     outline-none transition"
          {...register("name", {
            required: "Le nom du dossier est requis",
          })}
        />

        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
      </div>

      {/* 🧩 Bouton d’action */}
      <div className="flex flex-col justify-center items-center">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 px-4 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md py-2 mt-2 transition-colors disabled:opacity-60"
        >
          {isPending ? (
            <>
              <span>Création...</span>
              <SpinnerLoader size={16} />
            </>
          ) : (
            "Créer le dossier"
          )}
        </button>
      </div>
    </form>
  );
};
