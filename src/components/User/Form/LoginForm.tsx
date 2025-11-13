import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import type { UserCredential } from "../../../interfaces/user/user";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";
import Loader from "../../Spinner/Loader";
import { EyeOff, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ErrorResponse } from "../../../interfaces/common";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredential>();

  const { mutateAsync, isError, isPending, error } = useMutation({
    mutationFn: async (data: UserCredential) => await api.login(data),
    retry: false,
    onSuccess: (data) => {
      authenticate(data);
      navigate("/dashboard");
    },
  });

  const onSubmit = async (data: UserCredential) => {
    await mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 font-montserrat"
    >
      {isError && (
        <p className="text-sm text-red-500 text-center dark:text-red-400">
          {(error as unknown as ErrorResponse).message ||
            "Une erreur est survenue lors de la connexion."}
        </p>
      )}

      {/* ✅ Email ou nom d'utilisateur */}
      <div className="space-y-1">
        <label
          htmlFor="credential"
          className="text-sm font-semibold text-gray-800 dark:text-gray-200 block text-center"
        >
          Email ou nom d'utilisateur
        </label>

        <input
          type="text"
          id="credential"
          autoComplete="username"
          placeholder="Entrez votre email ou nom d'utilisateur"
          {...register("credential", {
            required: "Veuillez entrer votre email ou nom d'utilisateur",
          })}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500"
        />
        {errors.credential && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.credential.message}
          </p>
        )}
      </div>

      {/* ✅ Mot de passe */}
      <div className="space-y-1">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-gray-800 dark:text-gray-200 block text-center"
        >
          Mot de passe
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            placeholder="••••••••"
            {...register("password", {
              required: "Veuillez entrer votre mot de passe",
              minLength: {
                value: 6,
                message: "Le mot de passe doit comporter au moins 6 caractères",
              },
            })}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pr-10 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.password && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* ✅ Bouton */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isPending}
          className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white px-5 py-2 rounded-md text-xs tracking-widest font-bold uppercase cursor-pointer transition flex items-center gap-2 disabled:opacity-70"
        >
          {isPending && <Loader size={16} />}
          {isPending ? "Connexion..." : "Se connecter"}
        </button>
      </div>
    </form>
  );
};
