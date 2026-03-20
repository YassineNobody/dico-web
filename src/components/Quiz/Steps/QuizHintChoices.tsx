type Props = {
  choices: string[];
  onSelect: (value: string) => void;
};

const QuizHintChoices = ({ choices, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {choices.map((choice) => (
        <button
          key={choice}
          onClick={() => onSelect(choice)}
          className="px-5 py-3 border rounded-md text-2xl transition
          bg-gray-100 hover:bg-gray-200
          dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          {choice}
        </button>
      ))}
    </div>
  );
};

export default QuizHintChoices;
