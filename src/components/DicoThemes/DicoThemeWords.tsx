import { useQuery } from "@tanstack/react-query";
import { getWordsByTheme } from "../../services/word";
import { LoadingMessage } from "../Loader/LoadingMessage";
import type { ErrorResponse } from "../../interfaces/common";
import { DicoPublic } from "../Dico/DicoPublicList";

export const DicoThemeWords = ({ theme }: { theme: string }) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["theme-words", theme],
    queryFn: async () => await getWordsByTheme(theme),
    enabled: !!theme,
    staleTime: 1000 * 60 * 10,
  });
  if (isLoading) {
    return (
      <div className="flex-1  flex flex-col items-center justify-center">
        <div>
          <LoadingMessage label="chargement en cours ..." />
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-row gap-2 text-base sm:text-lg lg:text-xl font-montserrat text-red-600 tracking-wide">
          <div className="font-medium">Une erreur est survenue : </div>
          <div className="font-medium">
            {(error as unknown as ErrorResponse)?.message ?? "Erreur interne"}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {data?.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center font-montserrat tracking-wide italic font-medium text-lg">
          <span>🤭 Oops le dico est vide ...</span>
        </div>
      ) : (
        <DicoPublic words={data ?? []} />
      )}
    </div>
  );
};
