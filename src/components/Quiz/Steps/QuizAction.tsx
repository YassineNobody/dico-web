type Props = {
  disableHint: boolean;
  onHint: () => void;
  onSkip: () => void;
  onValidate: () => void;
};

const QuizActions = ({ disableHint, onHint, onSkip, onValidate }: Props) => {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <button
        onClick={onHint}
        disabled={disableHint}
        className="px-4 py-3 rounded-md border"
      >
        Indice
      </button>

      <button onClick={onSkip} className="px-4 py-3 rounded-md border">
        Je sais pas
      </button>

      <button
        onClick={onValidate}
        className="px-4 py-3 rounded-md bg-black text-white dark:bg-white dark:text-black"
      >
        Valider
      </button>
    </div>
  );
};

export default QuizActions;
