import { useState } from "react";

type Props = {
  onStart: (hintMode: "limited" | "unlimited") => void;
};

const QuizIntro = ({ onStart }: Props) => {
  const [hintMode, setHintMode] = useState<"limited" | "unlimited">("limited");

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8">
      <div className="text-center max-w-2xl space-y-3">
        <h2 className="text-2xl font-semibold font-montserrat">
          Bienvenue dans le quiz
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Traduisez les mots français en arabe dans le champ de réponse.
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Si vous utilisez un indice, aucun point ne sera attribué pour cette
          question.
        </p>
      </div>

      {/* choix indices */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        <button
          onClick={() => setHintMode("limited")}
          className={`px-4 py-3 rounded-md border text-sm transition
          ${
            hintMode === "limited"
              ? "bg-black text-white border-black dark:bg-white dark:text-black"
              : "bg-gray-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700"
          }`}
        >
          3 indices maximum
        </button>

        <button
          onClick={() => setHintMode("unlimited")}
          className={`px-4 py-3 rounded-md border text-sm transition
          ${
            hintMode === "unlimited"
              ? "bg-black text-white border-black dark:bg-white dark:text-black"
              : "bg-gray-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700"
          }`}
        >
          Indices illimités
        </button>
      </div>

      {/* start */}
      <button
        onClick={() => onStart(hintMode)}
        className="px-6 py-3 rounded-md bg-black text-white dark:bg-white dark:text-black"
      >
        Commencer
      </button>
    </div>
  );
};

export default QuizIntro;
