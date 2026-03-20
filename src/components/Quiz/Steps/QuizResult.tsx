type QuizHistory = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  status: "correct" | "hint" | "wrong";
  usedHint: boolean;
};

type Props = {
  score: number;
  total: number;
  history: QuizHistory[];
  onRestart: () => void;
  onNextSection: () => void;
};

const QuizResult = ({
  score,
  total,
  history,
  onRestart,
  onNextSection,
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
      <div className="text-2xl font-semibold">Résultat final</div>

      <div className="text-lg">
        Score : {score} / {total}
      </div>

      <div className="w-full flex flex-col gap-3">
        {history.map((item, i) => (
          <div
            key={i}
            className={`border rounded-md p-4 ${
              item.status === "correct"
                ? "border-green-500"
                : item.status === "hint"
                  ? "border-yellow-500"
                  : "border-red-500"
            }`}
          >
            <div className="font-medium">{item.question}</div>

            <div className="text-sm text-gray-500">
              Votre réponse : {item.userAnswer || "Aucune réponse"}
            </div>

            <div className="text-sm">Bonne réponse : {item.correctAnswer}</div>

            <div
              className={`text-sm font-medium ${
                item.status === "correct"
                  ? "text-green-600"
                  : item.status === "hint"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {item.status === "correct"
                ? "✔ Correct"
                : item.status === "hint"
                  ? "△ Avec indice"
                  : "✘ Faux"}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <button onClick={onRestart} className="px-4 py-3 rounded-md border">
          Refaire le quiz
        </button>

        <button
          onClick={onNextSection}
          className="px-4 py-3 rounded-md bg-black text-white dark:bg-white dark:text-black"
        >
          Section suivante
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
