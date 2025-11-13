import { createContext, useContext, type ReactNode } from "react";
import type { ErrorResponse } from "../interfaces/common";
import type { Authenticate, User } from "../interfaces/user/user";
import { useLocalStorageState } from "./useLocalStorageState";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { LoadingMessage } from "../components/Loader/LoadingMessage";

export interface AuthContextValue {
  user?: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  authenticate: (auth: Authenticate) => void;
  logout: () => void;
  error: Error | ErrorResponse | null;
}
const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderContext {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderContext) => {
  const { value: tokenValue, persistValue: persistToken } =
    useLocalStorageState("auth");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const keyAuth = ["auth-user"];
  const isAuthenticated = !!tokenValue;
  const {
    data: auth,
    isLoading,
    isError,
    error,
  } = useQuery<Authenticate, Error>({
    queryKey: keyAuth,
    queryFn: async () => {
      return await api.currentUser(tokenValue);
    },
    retry: false,
    enabled: isAuthenticated,
  });

  const setUser = (user: User) => {
    queryClient.setQueryData(keyAuth, user);
  };

  const authenticate = ({ user, token }: Authenticate) => {
    persistToken(token);
    queryClient.setQueryData(keyAuth, user);
  };
  const logout = () => {
    api.logout();
    persistToken("");
    queryClient.removeQueries({ queryKey: keyAuth });
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white justify-center flex items-center">
        <LoadingMessage />
      </div>
    );
  }
  if (isError) {
    api.logout();
    persistToken("");
    queryClient.removeQueries({ queryKey: keyAuth });
  }

  return (
    <AuthContext.Provider
      value={{
        user: auth?.user,
        setUser,
        authenticate,
        logout,
        error: isError ? error : null,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
