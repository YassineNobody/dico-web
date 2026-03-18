import { useForm } from "react-hook-form";
import { useState } from "react";
import { type CreateWord, WordType } from "../../interfaces/dico/word";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWord } from "../../services/word";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const mapWordType = (type: string): string => {
  switch (type) {
    case "noun":
      return "Nom";
    case "verb":
      return "Verbe";
    case "adjective":
      return "Adjectif";
    case "adverb":
      return "Adverbe";
    case "preposition":
      return "Préposition";
    case "pronoun":
      return "Pronom";
    case "suffix":
      return "Suffixe";
    default:
      return "Autre";
  }
};

export const CreateWordForm = () => {
  const client = useQueryClient();
  const navigate = useNavigate();

  const [themes, setThemes] = useState<string[]>([]);
  const [themeInput, setThemeInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateWord>({
    defaultValues: {
      sourceLanguage: "FR",
      targetLanguage: "AR",
    },
  });

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async (data: CreateWord) => await createWord(data),
    retry: false,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dico-public"] });
      client.invalidateQueries({ queryKey: ["my-dico"] });
      reset();
      setThemes([]);
      navigate("/dico/my-dico");
    },
  });

  const addTheme = () => {
    const value = themeInput.trim().toLowerCase();
    if (!value || themes.includes(value)) return;
    setThemes([...themes, value]);
    setThemeInput("");
  };

  const removeTheme = (theme: string) => {
    setThemes(themes.filter((t) => t !== theme));
  };

  const onSubmit = async (data: CreateWord) => {
    await mutateAsync({
      ...data,
      themes,
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto space-y-7 font-montserrat 
                 bg-white dark:bg-gray-950 rounded-2xl p-6 
                 shadow-md dark:shadow-blue-950/30 
                 border border-gray-200 dark:border-gray-800"
    >
      {/* Champ français */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Nom en français
        </label>

        <input
          type="text"
          placeholder="Ex: chat"
          className="rounded-xl border border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-900 px-4 py-2.5 
                     text-gray-800 dark:text-gray-100 
                     focus:ring-2 focus:ring-blue-500"
          {...register("sourceWord", {
            required: "Le nom en français est requis",
          })}
        />

        {errors.sourceWord && (
          <p className="text-red-600 text-xs">{errors.sourceWord.message}</p>
        )}
      </div>

      {/* Champ arabe */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            Nom en arabe
          </label>

          <Link
            to="https://monclavierarabe.com/"
            target="_blank"
            className="text-[13px] text-blue-600 hover:text-blue-800 
                       dark:text-blue-400"
          >
            🌐 Clavier arabe
          </Link>
        </div>

        <input
          type="text"
          lang="ar"
          dir="rtl"
          placeholder="اكتب هنا..."
          className="rounded-xl border border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-900 px-4 py-2.5 
                     text-right font-arabic text-lg"
          {...register("translationWord", {
            required: "Le nom en arabe est requis",
          })}
        />

        {errors.translationWord && (
          <p className="text-red-600 text-xs">
            {errors.translationWord.message}
          </p>
        )}
      </div>

      {/* Type du mot */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Type du mot
        </label>

        <select
          className="rounded-xl border border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-900 px-4 py-2.5"
          {...register("wordType", {
            required: "Le type du mot est requis",
          })}
        >
          <option value="">-- sélectionner un type --</option>
          {Object.values(WordType).map((value) => (
            <option key={value} value={value}>
              {mapWordType(value)}
            </option>
          ))}
        </select>

        {errors.wordType && (
          <p className="text-red-600 text-xs">{errors.wordType.message}</p>
        )}
      </div>

      {/* THEMES TAGS */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Thèmes
        </label>

        <div
          className="flex flex-wrap gap-2 p-2 rounded-xl border 
                     border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-900"
        >
          {themes.map((theme) => (
            <span
              key={theme}
              className="flex items-center gap-2 px-3 py-1 text-sm
                         bg-blue-100 dark:bg-blue-900/40
                         text-blue-700 dark:text-blue-300
                         rounded-full"
            >
              {theme}

              <button
                type="button"
                onClick={() => removeTheme(theme)}
                className="text-xs hover:text-red-500"
              >
                ✕
              </button>
            </span>
          ))}

          <input
            type="text"
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTheme();
              }
            }}
            placeholder="Ajouter un thème..."
            className="flex-1 min-w-[120px] bg-transparent outline-none 
                       text-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Bouton */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2
                     bg-linear-to-r from-blue-600 to-blue-500 
                     hover:from-blue-700 hover:to-blue-600
                     text-white font-semibold px-8 py-2.5 rounded-xl"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> Envoi...
            </>
          ) : (
            "Ajouter le mot"
          )}
        </button>
      </div>

      {isError && (
        <p className="text-center text-red-600 text-sm">
          ❌ Une erreur est survenue : {error?.message}
        </p>
      )}
    </motion.form>
  );
};
