import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteAllWords, getMyWords } from "../../../services/word";
import { LoadingMessage } from "../../Loader/LoadingMessage";
import type { ErrorResponse } from "../../../interfaces/common";
import type { WordType } from "../../../interfaces/dico/word";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useModalConfirm } from "../../../hooks/useModalConfirmation";

export const StatisticWord = () => {
  const client = useQueryClient();
  const { confirm, ConfirmDialog } = useModalConfirm();

  // 🔹 Récupération des mots
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["my-dico"],
    queryFn: async () => await getMyWords(),
    retry: false,
  });

  // 🔹 Suppression de tous les mots
  const { mutateAsync: handleDeleteAll, isPending } = useMutation({
    mutationFn: async () => await deleteAllWords(),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["my-dico"] });
    },
  });

  // 🔹 Cas chargement
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <LoadingMessage label="Chargement des statistiques..." />
      </div>
    );
  }

  // 🔹 Cas erreur
  if (isError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <p className="text-base sm:text-lg font-montserrat text-red-600">
          Une erreur est survenue :
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {(error as unknown as ErrorResponse)?.message ?? "Erreur interne"}
        </p>
      </div>
    );
  }

  // 🔹 Cas aucun mot
  if (!data || data.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
        <p className="text-gray-600 dark:text-gray-400 font-montserrat">
          Aucun mot trouvé dans ton dictionnaire.
        </p>
      </div>
    );
  }

  // ✅ Calcul des statistiques
  const statistics: Record<WordType, number> = {};
  data.forEach((word) => {
    statistics[word.wordType] = (statistics[word.wordType] ?? 0) + 1;
  });

  const totalWords = data.length;
  const categories = Object.entries(statistics);

  // 🔸 Fonction de confirmation avant suppression
  const onDeleteAll = async () => {
    const result = await confirm({
      title: "Suppression de tous les mots",
      message:
        "Es-tu sûr de vouloir supprimer tous les mots de ton dictionnaire ? Cette action est irréversible.",
      confirmText: "Oui, supprimer tout",
      cancelText: "Annuler",
      icon: "error",
    });

    if (result) {
      await handleDeleteAll();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6 font-montserrat">
      {/* 🔹 Dialog global */}
      <ConfirmDialog />

      {/* 🧠 Titre */}
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
        Statistiques de ton dictionnaire
      </h2>

      {/* 📊 Total */}
      <div className="text-center mb-6">
        <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
          {totalWords}
        </span>{" "}
        <span className="text-gray-700 dark:text-gray-300 text-sm">
          mots enregistrés au total
        </span>
      </div>

      {/* 📈 Graphique de statistiques */}
      <div className="space-y-3 mb-6">
        {categories.map(([type, count], index) => {
          const percentage = Math.round((count / totalWords) * 100);
          const colors = [
            "bg-blue-500",
            "bg-green-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-yellow-500",
            "bg-indigo-500",
            "bg-teal-500",
          ];
          const color = colors[index % colors.length];

          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm"
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">
                  {type}
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {count} ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`${color} h-2 rounded-full transition-all`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 🗑️ Bouton Supprimer tout */}
      <button
        onClick={onDeleteAll}
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 
                   text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg
                   transition-all active:scale-95 disabled:opacity-50"
      >
        <Trash2 size={18} />
        {isPending ? "Suppression en cours..." : "Supprimer tous mes mots"}
      </button>
    </div>
  );
};
