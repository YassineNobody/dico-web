import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { LoadingMessage } from "../../components/Loader/LoadingMessage";

 const LogoutPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingMessage label="Déconnexion en cours..." />
    </div>
  );
};
export default LogoutPage