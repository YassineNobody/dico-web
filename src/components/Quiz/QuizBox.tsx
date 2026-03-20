import { ArrowRight } from "lucide-react";
import { useQuizMeta } from "../../hooks/useQuiz";
import { useState } from "react";
import QuizGame from "./QuizGame";

type Props = {
  themes: string[];
  limit: number;
  onStudyModeChange: (v: boolean) => void;
};

const QuizBox = ({ themes, limit, onStudyModeChange }: Props) => {
  const { data, isLoading, isError, error } = useQuizMeta(limit, themes);
  const [section, setSection] = useState<number | null>(null);

  if (themes.length === 0) {
    return (
      <div className="text-sm font-medium italic text-gray-500 dark:text-gray-400 flex-1 flex flex-col items-center pt-10">
        Aucun thème sélectionné
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400 flex-1 flex flex-col items-center pt-10">
        Chargement des quiz...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-sm text-red-500 flex-1 flex flex-col items-center pt-10 font-medium">
        Une erreur est survenue : {error?.message || "Erreur interne"}
      </div>
    );
  }

  if (!data) return null;

  if (section !== null) {
    return (
      <QuizGame
        themes={themes}
        limit={limit}
        section={section}
        onBack={() => {
          onStudyModeChange(false);
          setSection(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1 py-3 px-4">
      <div className="text-gray-600 dark:text-gray-400">
        {data.totalWords} mots disponibles • {data.totalSections} sections
      </div>

      <div className="flex flex-col items-center gap-2">
        {Array.from({ length: data.totalSections }).map((_, i) => {
          const s = i + 1;

          return (
            <button
              key={s}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onStudyModeChange(true);
                setSection(s);
              }}
              className="px-3 py-2 text-sm border rounded-md
              w-full md:max-w-3xl
              flex flex-row justify-between items-center font-montserrat tracking-wide
              bg-gray-100 border-gray-300 hover:bg-gray-200
              dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700"
            >
              <span>Quiz {s}</span>

              <span className="flex flex-row items-center gap-1 text-xs">
                Tester mes connaissances
                <ArrowRight size={16} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizBox;
