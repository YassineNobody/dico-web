import { createContext, useContext, type ReactNode } from "react";
import type { ErrorResponse } from "../interfaces/common";
import { useQuery } from "@tanstack/react-query";
import { getAllThemesWords } from "../services/word";
import { LoadingMessage } from "../components/Loader/LoadingMessage";
import { useAuth } from "./useAuth";

type WordsThemesValueContext = {
  wordsThemes: string[];
  error: Error | ErrorResponse | null;
};

export const WordsThemesContext = createContext<WordsThemesValueContext | null>(
  null,
);

WordsThemesContext.displayName = "WordsThemesContext";

export const WordsThemesProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const { isLoading, data, isError, error } = useQuery<string[], Error>({
    queryKey: ["words-themes"],
    queryFn: getAllThemesWords,
    enabled: isAuthenticated,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingMessage label="Chargement des thèmes..." />
      </div>
    );
  }

  return (
    <WordsThemesContext.Provider
      value={{
        wordsThemes: data ?? [],
        error: isError ? error : null,
      }}
    >
      {children}
    </WordsThemesContext.Provider>
  );
};

export const useWordsThemes = () => {
  const context = useContext(WordsThemesContext);

  if (!context) {
    throw new Error("useWordsThemes must be used within a WordsThemesProvider");
  }

  return context;
};
