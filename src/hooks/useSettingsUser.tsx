/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, type ReactNode, useMemo } from "react";
import type { ErrorResponse } from "../interfaces/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingMessage } from "../components/Loader/LoadingMessage";
import type { SettingsUser } from "../interfaces/settings/settings";
import { useAuth } from "./useAuth";
import settings from "../services/settings";

// 🎯 Typage global du contexte
type AsyncSettingsAction = () => Promise<SettingsUser>;

export interface SettingsContextValue {
  settings?: SettingsUser;
  setVisibility: AsyncSettingsAction;
  setShowOther: AsyncSettingsAction;
  resetAll: AsyncSettingsAction;
  error: Error | ErrorResponse | null;
  isLoading: boolean;
  isMutating: boolean;
}

const SettingsUserContext = createContext<SettingsContextValue | null>(null);

interface SettingsUserProviderProps {
  children: ReactNode;
}

export const SettingsUserProvider = ({
  children,
}: SettingsUserProviderProps) => {
  const client = useQueryClient();
  const keySettings = ["settings-user"];
  const { isAuthenticated } = useAuth();

  // 🔹 Chargement des paramètres utilisateur
  const { data, isLoading, error, isError } = useQuery({
    queryKey: keySettings,
    queryFn: async () => await settings.getSettingsUser(),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });

  // 🔹 Mutations avec invalidation automatique
  const mutationVisibility = useMutation({
    mutationFn: () => settings.setVisibility(),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: keySettings });
      client.invalidateQueries({ queryKey: ["dico-public"] });
    },
    retry: false,
  });

  const mutationShowOther = useMutation({
    mutationFn: () => settings.setShowOther(),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: keySettings });
      client.invalidateQueries({ queryKey: ["dico-public"] });
    },
    retry: false,
  });

  const mutationResetAll = useMutation({
    mutationFn: () => settings.resetAll(),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: keySettings });
      client.invalidateQueries({ queryKey: ["dico-public"] });
    },
    retry: false,
  });

  // 🔹 Fonctions d’action
  const setVisibility = async () => mutationVisibility.mutateAsync();
  const setShowOther = async () => mutationShowOther.mutateAsync();
  const resetAll = async () => mutationResetAll.mutateAsync();

  const isMutating =
    mutationVisibility.isPending ||
    mutationShowOther.isPending ||
    mutationResetAll.isPending;

  // 🔹 Valeur mémoïsée pour éviter les re-renders inutiles
  const value = useMemo<SettingsContextValue>(
    () => ({
      settings: data,
      setVisibility,
      setShowOther,
      resetAll,
      error: isError ? error : null,
      isLoading,
      isMutating,
    }),
    [
      data,
      isError,
      error,
      isLoading,
      isMutating,
      setVisibility,
      setShowOther,
      resetAll,
    ]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex justify-center items-center">
        <LoadingMessage />
      </div>
    );
  }

  return (
    <SettingsUserContext.Provider value={value}>
      {children}
    </SettingsUserContext.Provider>
  );
};

// ✅ Hook personnalisé
// eslint-disable-next-line react-refresh/only-export-components
export const useSettingsUser = () => {
  const context = useContext(SettingsUserContext);
  if (!context) {
    throw new Error(
      "useSettingsUser must be used within a <SettingsUserProvider>"
    );
  }
  return context;
};
