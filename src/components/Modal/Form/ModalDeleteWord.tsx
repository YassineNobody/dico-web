import type { FC } from "react";
import type { Word } from "../../../interfaces/dico/word";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWord } from "../../../services/word";
import { ArrowRight, Trash2 } from "lucide-react";
import type { ErrorResponse } from "../../../interfaces/common";
import SpinnerLoader from "../../Spinner/Loader";

interface ModalDeleteWordProps {
  word: Word;
  onClose: () => void;
}

export const ModalDeleteWord: FC<ModalDeleteWordProps> = ({
  word,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError, error, isPending } = useMutation({
    mutationFn: () => deleteWord(word.uuid!),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-dico"] });
      queryClient.invalidateQueries({ queryKey: ["dico-public"] });
      onClose();
    },
  });

  const handleDelete = async () => {
    await mutateAsync();
  };

  return (
    <div className="flex flex-col gap-4  p-6 max-w-md mx-auto">
      {/* ⚠️ Texte d’avertissement */}
      <div className="flex flex-col gap-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        <p>
          Vous êtes sur le point de{" "}
          <span className="font-semibold text-red-600 dark:text-red-400">
            supprimer définitivement
          </span>{" "}
          le mot suivant :
        </p>

        <div className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {word.sourceWord}
          </span>
          <ArrowRight size={16} className="text-gray-400" />
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {word.translationWord}
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Cette action est irréversible.
        </p>
      </div>

      {/* ⚠️ Erreur API */}
      {isError && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 rounded-md px-3 py-2">
          {(error as unknown as ErrorResponse)?.message ??
            "Une erreur interne est survenue."}
        </div>
      )}

      {/* 🧩 Actions */}
      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="px-4 py-2 cursor-pointer text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Annuler
        </button>

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="flex items-center cursor-pointer justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-60"
        >
          {isPending ? (
            <>
              <SpinnerLoader size={16} />
              <span>Suppression...</span>
            </>
          ) : (
            <>
              <Trash2 size={16} />
              <span>Supprimer</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
