import { useWordsThemes } from "../../../hooks/useWordsThemes";

export const QuizPage = () => {
  const { wordsThemes } = useWordsThemes();
  console.log(wordsThemes)
  return <div>QuizPage</div>;
};
