import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";
import Loader from "../../Spinner/Loader";
import { EyeOff, Eye } from "lucide-react";
import type { UserRegisterForm } from "../../../interfaces/user/user";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { ErrorResponse } from "../../../interfaces/common";

export const RegisterForm = () => {
  const { authenticate } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterForm>();

  const { mutateAsync, isError, error, isPending } = useMutation({
    mutationFn: async (data: UserRegisterForm) => await api.register(data),
    retry: false,
    onSuccess: (data) => {
      authenticate(data);
      navigate("/dashboard");
    },
  });

  const onSubmit = async (data: UserRegisterForm) => {
    await mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 font-montserrat"
    >
      {isError && (
        <p className="text-sm text-red-500 dark:text-red-400 text-center">
          {(error as unknown as ErrorResponse).message ||
            "Une erreur est survenue lors de l'inscription."}
        </p>
      )}

      {/* ✅ Email */}
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="text-sm font-semibold text-gray-800 dark:text-gray-200 block text-center"
        >
          Adresse email
        </label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          placeholder="Entrez votre email"
          {...register("email", {
            required: "L'email est requis",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Adresse email invalide",
            },
          })}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500"
        />
        {errors.email && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* ✅ Nom d'utilisateur */}
      <div className="space-y-1">
        <label
          htmlFor="username"
          className="text-sm font-semibold text-gray-800 dark:text-gray-200 block text-center"
        >
          Nom d'utilisateur
        </label>
        <input
          type="text"
          id="username"
          autoComplete="username"
          placeholder="Entrez votre nom d'utilisateur"
          {...register("username", {
            required: "Le nom d'utilisateur est requis",
            minLength: {
              value: 3,
              message: "Minimum 3 caractères requis",
            },
          })}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500"
        />
        {errors.username && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* ✅ Surnom */}
      <div className="space-y-1">
        <label
          htmlFor="nickname"
          className="text-sm font-semibold text-gray-800 dark:text-gray-200 block text-center"
        >
          Surnom (optionnel)
        </label>
        <input
          type="text"
          id="nickname"
          placeholder="Entrez un surnom (facultatif)"
          {...register("nickname")}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500"
        />
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
            autoComplete="new-password"
            placeholder="••••••••"
            {...register("password", {
              required: "Le mot de passe est requis",
              minLength: {
                value: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères",
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

      {/* ✅ Bouton d'inscription */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isPending}
          className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white px-5 py-2 rounded-md text-xs tracking-widest font-bold uppercase cursor-pointer transition flex items-center gap-2 disabled:opacity-70"
        >
          {isPending && <Loader size={16} />}
          {isPending ? "Inscription..." : "Créer un compte"}
        </button>
      </div>
    </form>
  );
};
