import { Link } from "react-router-dom";
import { LoginForm } from "../../components/User/Form/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-6">
        <h1 className="text-xl sm:text-2xl font-semibold font-montserrat text-gray-800 dark:text-gray-100 text-center">
          Connectez-vous à votre compte
        </h1>

        <div className="w-full">
          <LoginForm />
        </div>

        {/* 
        <div className="w-full text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        */}

        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          Vous n’avez pas de compte ?{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Inscrivez-vous ici
          </Link>
        </p>
      </div>
    </div>
  );
};
