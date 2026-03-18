import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import {
  FileJson,
  XCircle,
  CheckCircle2,
  Upload,
  RotateCcw,
} from "lucide-react";
import { WordType, type CreateWord } from "../../interfaces/dico/word";
import { importWord } from "../../services/word";
import { useMutation } from "@tanstack/react-query";

const VALID_LANGS = ["AR", "FR"];
const VALID_TYPES = Object.values(WordType);

export const ImportWordForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CreateWord[] | null>(null);
  const [previewCount] = useState(3);

  const {
    mutateAsync,
    isPending,
    data: importResult,
  } = useMutation({
    mutationFn: async (words: CreateWord[]) => await importWord(words),
  });

  // 🟦 Gestion du fichier JSON
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    setData(null);

    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".json")) {
      setError("❌ Le fichier doit être au format .json");
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) {
        setError("❌ Le contenu doit être un tableau JSON d’objets");
        return;
      }

      // 🔍 Vérification de chaque entrée
      for (const [index, item] of parsed.entries()) {
        const keys = [
          "sourceWord",
          "sourceLanguage",
          "translationWord",
          "targetLanguage",
          "wordType",
          "themes",
        ];

        const hasAllKeys = keys.every((k) => Object.hasOwn(item, k));
        if (!hasAllKeys) {
          setError(
            `❌ Ligne ${
              index + 1
            }: il manque une ou plusieurs clés obligatoires (${keys.join(
              ", ",
            )})`,
          );
          return;
        }

        if (!VALID_LANGS.includes(item.sourceLanguage)) {
          setError(
            `❌ Ligne ${index + 1}: "sourceLanguage" doit être "AR" ou "FR"`,
          );
          return;
        }

        if (!VALID_LANGS.includes(item.targetLanguage)) {
          setError(
            `❌ Ligne ${index + 1}: "targetLanguage" doit être "AR" ou "FR"`,
          );
          return;
        }

        if (!VALID_TYPES.includes(item.wordType)) {
          setError(
            `❌ Ligne ${index + 1}: "wordType" (${
              item.wordType
            }) n’est pas valide`,
          );
          return;
        }
      }

      setData(parsed);
    } catch (err) {
      console.error(err);
      setError("❌ Erreur lors de la lecture du fichier JSON");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/json": [".json"] },
    multiple: false,
  });

  const handleImport = async () => {
    if (!data) return;
    try {
      await mutateAsync(data);
    } catch (err) {
      console.error(err);
      setError("❌ Une erreur est survenue lors de l’importation");
    }
  };

  const handleClear = () => {
    setData(null);
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto font-montserrat"
    >
      {/* 🟨 Zone de drop (visible uniquement si data est null) */}
      {!data && (
        <div
          {...getRootProps()}
          className={`cursor-pointer border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all duration-200
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50 scale-[1.02]"
              : "border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-gray-50/50 dark:hover:bg-gray-900/40"
          }`}
        >
          <input {...getInputProps()} />
          <FileJson className="w-14 h-14 text-blue-500 mb-3" />
          <p className="text-base text-gray-700 dark:text-gray-200 font-medium">
            {isDragActive
              ? "Dépose ton fichier JSON ici..."
              : "Glisse ou clique pour importer un fichier JSON"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
            Format attendu : tableau d’objets avec{" "}
            <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
              sourceWord, translationWord, sourceLanguage, targetLanguage,
              wordType, themes
            </code>
          </p>
        </div>
      )}

      {/* 🟥 Message d’erreur */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-start gap-2 text-red-600 dark:text-red-400 text-sm 
                     bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                     p-3 rounded-lg"
        >
          <XCircle size={18} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* 🟩 Aperçu du JSON (quand data est présent) */}
      {data && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
                     rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 "
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
              ✅ {data.length} mots prêts à être importés
            </div>

            {/* 🧹 Bouton clear */}
            <button
              onClick={handleClear}
              className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 
                         hover:text-red-500 dark:hover:text-red-400 transition"
            >
              <RotateCcw size={14} />
              Effacer
            </button>
          </div>

          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
            {JSON.stringify(data.slice(0, previewCount), null, 2)}
            {data.length > previewCount && "\n..."}
          </pre>

          <button
            onClick={handleImport}
            disabled={isPending}
            className="mt-4 w-full flex items-center justify-center gap-2 
                       bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
                       text-white font-semibold px-6 py-2.5 rounded-xl 
                       transition-all shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Upload className="animate-spin w-5 h-5" /> Import en cours...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" /> Importer les mots
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* 🟢 Résultat d’import */}
      {importResult && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 border border-green-300 dark:border-green-800 rounded-lg 
                     bg-green-50 dark:bg-green-900/20 p-4 text-sm text-gray-800 dark:text-gray-200"
        >
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold">
            <CheckCircle2 size={18} />
            Import terminé avec succès
          </div>
          <ul className="mt-2 text-sm">
            <li>✅ Créés : {importResult.created}</li>
            <li>⚠️ Ignorés : {importResult.skipped}</li>
            {importResult.error?.length > 0 && (
              <li className="text-red-500 mt-1">
                ❌ Erreurs : {importResult.error.length} entrées invalides
              </li>
            )}
          </ul>
          {importResult.message && (
            <p className="mt-3 text-xs italic text-gray-600 dark:text-gray-400">
              {importResult.message}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
