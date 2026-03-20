type Props = {
  question: string;
  answer: string;
  errorInput: string;
  currentIndex: number;
  total: number;
  remainingHints?: number;
  hintMode: "limited" | "unlimited";
  onChangeAnswer: (value: string) => void;
};

const QuizQuestionCard = ({
  question,
  answer,
  errorInput,
  currentIndex,
  total,
  remainingHints,
  hintMode,
  onChangeAnswer,
}: Props) => {
  return (
    <div className="w-full max-w-xl flex flex-col gap-6">
      <div className="text-sm text-gray-500">
        Question {currentIndex + 1} / {total}
      </div>

      {hintMode === "limited" && (
        <div className="text-sm text-gray-500">
          Indices restants : {remainingHints}
        </div>
      )}

      <div className="text-2xl font-semibold text-center">{question}</div>

      <input
        value={answer}
        onChange={(e) => onChangeAnswer(e.target.value)}
        placeholder="Écris en arabe..."
        className="border rounded-md px-4 py-3 text-center dark:bg-neutral-900"
      />

      {errorInput && (
        <div className="text-sm text-red-500 text-center">{errorInput}</div>
      )}
    </div>
  );
};

export default QuizQuestionCard;
