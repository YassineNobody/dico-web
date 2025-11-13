import { RegisterForm } from "../../components/User/Form/RegisterForm";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-6">
        <h1 className="text-2xl sm:text-3xl font-semibold font-montserrat text-gray-800 dark:text-gray-100 text-center">
          Créez un compte
        </h1>

        <div className="w-full">
          <RegisterForm />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          Vous avez déjà un compte ?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Connectez-vous ici
          </Link>
        </p>
      </div>
    </div>
  );
};
