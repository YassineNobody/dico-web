import { createContext, useContext, type ReactNode } from "react";
import type { ErrorResponse } from "../interfaces/common";
import { useQuery } from "@tanstack/react-query";
import { getFolders } from "../services/folders";
import { useAuth } from "./useAuth";
import { LoadingMessage } from "../components/Loader/LoadingMessage";
import type { FolderMenu } from "../interfaces/folder/folder";

type FoldersContextValue = {
  folders: FolderMenu[];
  isLoading: boolean;
  error: Error | ErrorResponse | null;
};

export const FoldersContext = createContext<FoldersContextValue | null>(null);

export const FoldersProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["folders"],
    queryFn: async () => await getFolders(),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen justify-center flex items-center bg-white">
        <LoadingMessage label="Chargement du menu..." />
      </div>
    );
  }

  return (
    <FoldersContext.Provider
      value={{
        folders: data ? data : [],
        error: isError ? error : null,
        isLoading,
      }}
    >
      {children}
    </FoldersContext.Provider>
  );
};

export const useFolders = () => {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useMenu must be used within a FoldersProvider");
  }
  return context;
};
