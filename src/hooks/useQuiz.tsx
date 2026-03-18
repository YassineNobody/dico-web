import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getMetaQuiz, getQuiz } from "../services/quiz";

export function useQuizMeta(limit: number, themes: string[]) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["quiz-meta", themes, limit],
    queryFn: () => getMetaQuiz(themes, limit),
    enabled: isAuthenticated && themes.length > 0,
  });
}

export function useQuiz(limit: number, themes: string[], section: number) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["quiz", themes, limit, section],
    queryFn: () => getQuiz(limit, themes, section),
    enabled: isAuthenticated && themes.length > 0,
  });
}