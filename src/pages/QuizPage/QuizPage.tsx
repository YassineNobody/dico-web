import { useState, useCallback } from "react";
import FilterTags from "../../components/FlashCard/FilterTags";
import QuizMetaSelect from "../../components/Quiz/QuizMetaSelect";
import QuizBox from "../../components/Quiz/QuizBox";

type QuizParams = {
  themes: string[];
  limit: number;
};

const QuizPage = () => {
  const [studyMode, setStudyMode] = useState(false);

  const [params, setParams] = useState<QuizParams>({
    themes: [],
    limit: 5,
  });

  const handleChange = useCallback((data: QuizParams) => {
    setParams(data);
  }, []);

  const removeTheme = useCallback((theme: string) => {
    setParams((prev) => ({
      ...prev,
      themes: prev.themes.filter((t) => t !== theme),
    }));
  }, []);

  const startQuiz = () => {
    if (params.themes.length === 0) return;
    setStudyMode(true);
  };

  return (
    <div className="pt-26 flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* CONFIGURATION */}
      {!studyMode && (
        <>
          <div className="px-4 py-6 flex flex-col md:items-center">
            <div className="w-full md:max-w-4xl font-montserrat">
              <QuizMetaSelect
                themes={params.themes}
                limit={params.limit}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* FILTRES */}
          <div className="flex flex-row items-center gap-3 px-4 py-3">
            <span className="text-lg font-montserrat font-light tracking-wider">
              Vos filtres :
            </span>

            <div className="overflow-x-auto whitespace-nowrap">
              <FilterTags
                themes={params.themes}
                limit={params.limit}
                onRemoveTheme={removeTheme}
              />
            </div>
          </div>

          {/* START QUIZ */}
          <div className="flex flex-col items-center gap-3 justify-center px-4 pt-6">
            {params.themes.length === 0 && (
              <span className="text-sm italic font-medium">
                Veuillez sélectionner un ou plusieurs thèmes
              </span>
            )}
            <button
              onClick={startQuiz}
              disabled={params.themes.length === 0}
              className="px-6 py-3 rounded-md text-sm font-medium transition
              bg-black text-white hover:bg-gray-800
              disabled:bg-gray-400 disabled:cursor-not-allowed
              dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Commencer le quiz
            </button>
          </div>
        </>
      )}

      {/* QUIZ MODE */}
      {studyMode && (
        <div className="flex flex-1 items-center justify-center">
          <QuizBox themes={params.themes} limit={params.limit} onStudyModeChange={setStudyMode} />
        </div>
      )}
    </div>
  );
};

export default QuizPage;
