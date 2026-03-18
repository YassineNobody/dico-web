import { useQuery } from "@tanstack/react-query";
import { learnGetAll } from "../../services/learn";
import type { ErrorResponse } from "../../interfaces/common";
import { LoadingMessage } from "../../components/Loader/LoadingMessage";
import { AllBoxLearn } from "../../components/Learn/AllBoxLearn";

 const LearnAllLessonsPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["learn-all"],
    queryFn: async () => await learnGetAll(),
    retry: false,
    staleTime: 1000 * 60 * 15,
  });

  // 🌀 Chargement
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingMessage label="Chargement en cours..." />
      </div>
    );
  }

  // ❌ Erreur
  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-600 font-montserrat">
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-semibold text-lg">Une erreur est survenue :</h3>
          <p>
            {(error as unknown as ErrorResponse)?.message ?? "Erreur interne"}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col pt-24 items-center text-black dark:text-white">
      <div className="flex-1 w-full flex flex-col px-4 py-5">
        <h1 className="text-center text-xl md:text-2xl font-montserrat tracking-wider font-medium">
          Tout les cours d'arabe
        </h1>

        {data && <AllBoxLearn learns={data} />}
      </div>
    </div>
  );
};
export default LearnAllLessonsPage;