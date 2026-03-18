import { useState } from "react";
import FlashCardMetaSelect from "../../components/FlashCard/FlashCardMetaSelect";
import FilterTags from "../../components/FlashCard/FilterTags";
import { FlashCardBox } from "../../components/FlashCard/FlashCardBox";

const FlashcardsPage = () => {
  const [studyMode, setStudyMode] = useState(false);
  const [params, setParams] = useState<{ themes: string[]; limit: number }>({
    themes: [],
    limit: 5,
  });

  const handleChange = (data: { themes: string[]; limit: number }) => {
    setParams(data);
  };

  const removeTheme = (theme: string) => {
    setParams((prev) => ({
      ...prev,
      themes: prev.themes.filter((t) => t !== theme),
    }));
  };

  return (
    <div className="pt-26 flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {!studyMode && (
        <>
          <div className="px-4 py-6 flex flex-col md:items-center">
            <div className="w-full md:max-w-4xl font-montserrat">
              <FlashCardMetaSelect
                themes={params.themes}
                limit={params.limit}
                onChange={handleChange}
              />
            </div>
          </div>

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
        </>
      )}

      <FlashCardBox
        themes={params.themes}
        limit={params.limit}
        onStudyModeChange={setStudyMode}
      />
    </div>
  );
};

export default FlashcardsPage;
