import { useQuery } from "@tanstack/react-query";
import { getMyWords } from "../../services/word";
import { LoadingMessage } from "../../components/Loader/LoadingMessage";
import type { ErrorResponse } from "../../interfaces/common";
import { DicoPublic } from "../../components/Dico/DicoPublicList";

export const MyDicoPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["my-dico"],
    queryFn: async () => await getMyWords(),
    retry: false,
    staleTime: 1000 * 60 * 5,
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
            {(error as unknown as ErrorResponse).message ?? "Erreur interne"}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-26 flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <div className="flex flex-row items-center justify-center">
        <span className="font-montserrat py-3 text-center italic tracking-wider uppercase underline underline-offset-4 font-bold text-xl md:text-2xl">
          Mon Dico
        </span>
      </div>
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
