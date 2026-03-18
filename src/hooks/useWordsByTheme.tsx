import { useQuery } from "@tanstack/react-query";
import { getWordsByTheme } from "../services/word";
import type { Word } from "../interfaces/dico/word";

export function useWordsByTheme(theme: string | null) {
  return useQuery<Word[]>({
    queryKey: ["words-theme", theme],
    queryFn: () => getWordsByTheme(theme!),
    enabled: !!theme,
    staleTime: 1000 * 60 * 10,
  });
}