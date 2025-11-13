import type { FC } from "react";
import {
  WordType,
  type WordUpdateForm,
  type Word,
} from "../../../interfaces/dico/word";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateWord } from "../../../services/word";
import SpinnerLoader from "../../Spinner/Loader";
import type { ErrorResponse } from "../../../interfaces/common";

interface ModalUpdateWordProps {
  onClose: () => void;
  word: Word;
}

const mapWordType = (type: string): string => {
  switch (type) {
    case "noun":
      return "Nom";
    case "verb":
      return "Verbe";
    case "adjective":
      return "Adjectif";
    case "adverb":
      return "Adverbe";
    case "preposition":
      return "Préposition";
    case "pronoun":
      return "Pronom";
    case "suffix":
      return "Suffixe";
    default:
      return "Autre";
  }
};

export const ModalUpdateWord: FC<ModalUpdateWordProps> = ({
  word,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WordUpdateForm>({
    defaultValues: {
      sourceWord: word.sourceWord,
      translationWord: word.translationWord,
      wordType: word.wordType,
    },
  });

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: WordUpdateForm) => updateWord(word.uuid!, data),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-dico"] });
      queryClient.invalidateQueries({ queryKey: ["dico-public"] });
      onClose();
    },
  });

  const onSubmit = async (data: WordUpdateForm) => {
    await mutateAsync(data);
  };

  const sourceL = word.sourceLanguage === "AR" ? "Arabe" : "Français";
  const targetL = word.targetLanguage === "FR" ? "Français" : "Arabe";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-3"
    >

      {/* ⚠️ Erreur API */}
      {isError && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 rounded-md px-3 py-2">
          {(error as unknown as ErrorResponse)?.message ??
            "Une erreur interne est survenue."}
        </div>
      )}

      {/* 🏷️ Champ source */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="sourceWord"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {sourceL}
        </label>
        <input
          id="sourceWord"
          type="text"
          {...register("sourceWord", {
            required: "Le mot source est requis.",
          })}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
        />
        {errors.sourceWord && (
          <p className="text-xs text-red-500 mt-1">
            {errors.sourceWord.message}
          </p>
        )}
      </div>

      {/* 🏷️ Champ traduction */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="translationWord"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {targetL}
        </label>
        <input
          id="translationWord"
          {...register("translationWord", {
            required: "Le mot traduit est requis.",
          })}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
        />
        {errors.translationWord && (
          <p className="text-xs text-red-500 mt-1">
            {errors.translationWord.message}
          </p>
        )}
      </div>

      {/* 🧠 Type du mot */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="wordType"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Type du mot
        </label>
        <select
          id="wordType"
          {...register("wordType")}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
        >
          {Object.values(WordType).map((entry, idx) => (
            <option key={idx} value={entry}>
              {mapWordType(entry)}
            </option>
          ))}
        </select>
      </div>

      {/* 🧩 Bouton d’action */}
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md py-2 mt-2 transition-colors disabled:opacity-60"
      >
        {isPending ? (
          <>
            <SpinnerLoader size={16} />
            <span>Enregistrement...</span>
          </>
        ) : (
          "Mettre à jour"
        )}
      </button>
    </form>
  );
};
