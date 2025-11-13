import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useMenuLearn } from "../../hooks/useMenuLearnCategories";
import { useQuery } from "@tanstack/react-query";
import { learnGetByCategory } from "../../services/learn";
import type { ErrorResponse } from "../../interfaces/common";
import { LoadingMessage } from "../../components/Loader/LoadingMessage";
import { LearnBox } from "../../components/Learn/LearnBox";
import { LearnReadOnly } from "../../components/Learn/LearnReadOnly";

export const LearnByCategoryPage = () => {
  const { slug } = useParams();
  const { menu } = useMenuLearn();
  const [searchParams] = useSearchParams();

  // 🔹 Query params
  const mode = searchParams.get("mode") ?? "box";
  const ref = searchParams.get("ref");

  // 🔹 Trouver la catégorie
  const category = slug ? menu.find((p) => p.slug === slug) : null;

  // 🔹 Charger les cours de la catégorie
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["learn-category", category?.id],
    queryFn: async () => await learnGetByCategory(category!.id),
    enabled: !!category,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // 🔹 Redirection si catégorie inexistante
  if (!slug || !category) {
    return <Navigate to="/learn-arabic" replace />;
  }

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

  // 🧭 Cas de navigation incohérente
  if (mode === "readonly" && !ref) {
    return <Navigate to={`/learn-arabic/${slug}?mode=box`} replace />;
  }

  if (mode !== "box" && mode !== "readonly") {
    return <Navigate to={`/learn-arabic/${slug}?mode=box`} replace />;
  }

  // 🔍 Trouver le cours si on est en mode readonly
  const selectedCourse =
    mode === "readonly" && ref && data
      ? data.find((course) => course.slug === ref)
      : null;

  if (mode === "readonly" && ref && !selectedCourse) {
    return <Navigate to={`/learn-arabic/${slug}?mode=box`} replace />;
  }
  // 🧱 Rendu principal
  return (
    <div className="flex-1 pt-24 px-4 sm:px-6 flex flex-col">
      {mode === "box" && data && <LearnBox cat={category} learns={data} />}

      {mode === "readonly" && selectedCourse && data && (
        <LearnReadOnly cat={category} learns={data} selected={selectedCourse} />
      )}
    </div>
  );
};
