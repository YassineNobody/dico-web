import { useState } from "react";
import { useQuiz } from "../../hooks/useQuiz";
import QuizIntro from "./Steps/QuizIntro";
import QuizActions from "./Steps/QuizAction";
import QuizHintChoices from "./Steps/QuizHintChoices";
import QuizQuestionCard from "./Steps/QuizQuestionCard";
import QuizResult from "./Steps/QuizResult";
import { compareArabicAnswer } from "../../utils/arabic";
type Props = {
  themes: string[];
  limit: number;
  section: number;
  onBack: () => void;
};

type Step = "intro" | "quiz" | "result";

type QuizHistory = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  status: "correct" | "hint" | "wrong";
  usedHint: boolean;
};

const QuizGame = ({ themes, limit, section, onBack }: Props) => {
  const { data, isLoading, isError, error } = useQuiz(limit, themes, section);

  const [step, setStep] = useState<Step>("intro");
  const [hintMode, setHintMode] = useState<"limited" | "unlimited">("limited");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  const [errorInput, setErrorInput] = useState("");
  const [usedHint, setUsedHint] = useState(false);
  const [remainingHints, setRemainingHints] = useState(3);

  const [history, setHistory] = useState<QuizHistory[]>([]);

  if (isLoading) {
    return (
      <div className="pt-10 text-sm text-gray-500">Chargement du quiz...</div>
    );
  }

  if (isError) {
    return (
      <div className="pt-10 text-red-500">{error?.message || "Erreur"}</div>
    );
  }

  if (!data) return null;

  const currentQuestion = data.questions[currentIndex];

  const nextQuestion = () => {
    if (currentIndex + 1 < data.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setAnswer("");
      setUsedHint(false);
      setErrorInput("");
    } else {
      setStep("result");
    }
  };

  const handleHint = () => {
    if (hintMode === "limited" && remainingHints <= 0) return;

    setUsedHint(true);

    if (hintMode === "limited") {
      setRemainingHints((prev) => prev - 1);
    }
  };

  const handleValidate = () => {
    const normalizedAnswer = answer.trim();
    const normalizedCorrect = currentQuestion.correctAnswer.trim();

    if (!normalizedAnswer) {
      setErrorInput("Veuillez écrire une réponse.");
      return;
    }

    const isCorrect = compareArabicAnswer(normalizedAnswer, normalizedCorrect);

    if (isCorrect && !usedHint) {
      setScore((prev) => prev + 1);
    }

    setHistory((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: normalizedAnswer,
        correctAnswer: normalizedCorrect,
        status: isCorrect ? (usedHint ? "hint" : "correct") : "wrong",
        usedHint,
      },
    ]);

    nextQuestion();
  };

  const handleSkip = () => {
    setHistory((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: "",
        correctAnswer: currentQuestion.correctAnswer,
        status: "wrong",
        usedHint: false,
      },
    ]);

    nextQuestion();
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswer("");
    setScore(0);
    setHistory([]);
    setUsedHint(false);
    setRemainingHints(3);
    setStep("intro");
  };

  const handleNextSection = () => {
    onBack();
  };

  return (
    <div className="flex flex-col items-center px-4 py-8 gap-6">
      {step === "intro" && (
        <QuizIntro
          onStart={(mode) => {
            setHintMode(mode);
            setStep("quiz");
          }}
        />
      )}

      {step === "quiz" && (
        <>
          <QuizQuestionCard
            question={currentQuestion.question}
            answer={answer}
            errorInput={errorInput}
            currentIndex={currentIndex}
            total={data.questions.length}
            remainingHints={remainingHints}
            hintMode={hintMode}
            onChangeAnswer={setAnswer}
          />

          {usedHint && (
            <QuizHintChoices
              choices={currentQuestion.choices}
              onSelect={setAnswer}
            />
          )}

          <QuizActions
            disableHint={hintMode === "limited" && remainingHints <= 0}
            onHint={handleHint}
            onSkip={handleSkip}
            onValidate={handleValidate}
          />
        </>
      )}

      {step === "result" && (
        <QuizResult
          score={score}
          total={data.questions.length}
          history={history}
          onRestart={handleRestart}
          onNextSection={handleNextSection}
        />
      )}
    </div>
  );
};

export default QuizGame;
