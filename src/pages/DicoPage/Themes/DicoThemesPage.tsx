import { useState } from "react";
import { DicoThemesBox } from "../../../components/DicoThemes/DicoThemesBox";
import { useWordsThemes } from "../../../hooks/useWordsThemes";
import { DicoThemeWords } from "../../../components/DicoThemes/DicoThemeWords";

export const DicoThemesPage = () => {
  const [selected, onSelected] = useState<null | string>(null);
  const { wordsThemes } = useWordsThemes();

  const onSelectedCheck = (theme: string) => {
    if (!theme) {
      onSelected(null);
      return;
    }
    onSelected(theme);
  };

  return (
    <div className="pt-26 flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-4xl w-full mx-auto px-4 flex-1 flex flex-col">
        {/* HEADER */}
        {selected ? (
          <span className="block font-montserrat py-4 text-center italic tracking-wider capitalize underline underline-offset-4 font-bold text-xl md:text-2xl">
            Thème : {selected}
          </span>
        ) : (
          <h1 className="font-montserrat py-4 text-center italic tracking-wider uppercase underline underline-offset-4 font-bold text-xl md:text-2xl">
            Mon Dico par thème
          </h1>
        )}

        {/* SI AUCUN THEME */}
        {wordsThemes.length === 0 ? (
          <div className="text-center text-gray-500 py-10 font-montserrat">
            Aucun thème disponible
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            {/* SELECTION THEME */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 py-6">
              <span className="text-md font-montserrat whitespace-nowrap">
                Choisir un thème :
              </span>

              <DicoThemesBox
                themes={wordsThemes}
                onChange={onSelectedCheck}
                onSelected={selected}
              />
            </div>

            {/* RESULTATS */}
            <div className="pt-4 flex-1 flex flex-col">
              {selected === null ? (
                <div className="text-center text-gray-400 italic py-10">
                  Aucun thème sélectionné
                </div>
              ) : (
                <DicoThemeWords theme={selected} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
