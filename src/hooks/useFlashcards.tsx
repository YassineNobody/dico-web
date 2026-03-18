import { useQuery } from "@tanstack/react-query";
import { getFlashcards, getMetaFlashCard } from "../services/flashcard";
import { useAuth } from "./useAuth";

export function useFlashcardMeta(limit: number, themes: string[]) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["flashcards-meta", themes, limit],
    queryFn: () => getMetaFlashCard(limit, themes),
    enabled: isAuthenticated && themes.length > 0,
  });
}

export function useFlashcards(limit: number, themes: string[], section:number) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["flashcards", themes, limit, section],
    queryFn: () => getFlashcards(limit, themes, section),
    enabled: isAuthenticated && themes.length > 0,
  });
}
