import { createContext, useContext, type ReactNode } from "react";
import type { ErrorResponse } from "../interfaces/common";
import type { Word } from "../interfaces/dico/word";
import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllWords, getMyWords } from "../services/word";

type DicoContextValue = {
  dicoPublic: Word[];
  dicoPrivate: Word[];

  isLoadingPublic: boolean;
  isLoadingPrivate: boolean;

  isErrorPublic: boolean;
  isErrorPrivate: boolean;

  errorPublic: Error | ErrorResponse | null;
  errorPrivate: Error | ErrorResponse | null;
};

export const DicoContext = createContext<DicoContextValue | null>(null);

export const DicoContextProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  /*
  =========================
  PRIVATE DICO
  =========================
  */

  const {
    data: dicoPrivate,
    isError: isErrorPrivate,
    error: errorPrivate,
    isLoading: isLoadingPrivate,
  } = useQuery({
    queryKey: ["my-dico"],
    queryFn: getMyWords,
    retry: false,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  /*
  =========================
  PUBLIC DICO
  =========================
  */

  const {
    data: dicoPublic,
    isError: isErrorPublic,
    error: errorPublic,
    isLoading: isLoadingPublic,
  } = useQuery({
    queryKey: ["dico-public"],
    queryFn: getAllWords,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <DicoContext.Provider
      value={{
        dicoPrivate: dicoPrivate ?? [],
        dicoPublic: dicoPublic ?? [],

        isLoadingPrivate,
        isLoadingPublic,

        isErrorPrivate,
        isErrorPublic,

        errorPrivate: isErrorPrivate ? errorPrivate : null,
        errorPublic: isErrorPublic ? errorPublic : null,
      }}
    >
      {children}
    </DicoContext.Provider>
  );
};

export const useDico = () => {
  const context = useContext(DicoContext);

  if (!context) {
    throw new Error("useDico must be used within a DicoContextProvider");
  }

  return context;
};
