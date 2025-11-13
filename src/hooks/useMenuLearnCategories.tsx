import { createContext, useContext, type ReactNode } from "react";
import type { ErrorResponse } from "../interfaces/common";
import type { LearnCategories } from "../interfaces/learnCategories/learnCategories";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../services/learn-categories";
import { LoadingMessage } from "../components/Loader/LoadingMessage";

type MenuValueContext = {
  menu: LearnCategories[];
  error: Error | null | ErrorResponse;
};

// eslint-disable-next-line react-refresh/only-export-components
export const MenuContext = createContext<MenuValueContext | null>(null);
MenuContext.displayName = "MenuContext";

export const MenuLearnCategoriesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu-learn"],
    queryFn: async () => await getAllCategories(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen justify-center flex items-center bg-white">
        <LoadingMessage label="Chargement du menu..." />
      </div>
    );
  }

  return (
    <MenuContext.Provider
      value={{
        menu: data ?? [],
        error: isError ? error : null,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useMenuLearn = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
