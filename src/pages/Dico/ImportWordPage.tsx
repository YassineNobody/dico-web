import { motion } from "framer-motion";
import { ArrowLeft, FileJson} from "lucide-react";
import { ImportWordForm } from "../../components/Dico/ImportWordForm";
import { Link } from "react-router-dom";

export const ImportWordPage = () => {
  return (
    <div className="flex-1 flex min-h-screen f-hull flex-col items-center justify-center px-4 py-32 bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 relative">
      {/* 🔙 Bouton retour */}
      <Link
        to="/dico/add-choice"
        className="flex flex-row items-center gap-2 absolute top-6 left-6 
                   text-sm font-montserrat tracking-wide font-medium 
                   bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700
                   text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl 
                   shadow-sm hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700
                   transition-all duration-200"
      >
        <ArrowLeft size={16} />
        <span>Retour</span>
      </Link>

      {/* 🧩 Contenu principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl p-8"
      >
        {/* 🧱 Titre */}
        <div className="flex flex-col items-center justify-center mb-8">
          <FileJson className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3" />
          <h1 className="text-center text-2xl md:text-3xl font-montserrat font-semibold text-blue-900 dark:text-blue-100">
            Importer des mots dans le dictionnaire
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-center text-sm max-w-md">
            Téléverse un fichier JSON contenant plusieurs mots à importer. Le
            système vérifiera automatiquement le format et les champs.
          </p>
        </div>

        {/* ✅ Formulaire d’import */}
        <ImportWordForm />
      </motion.div>

      {/* 🧠 Message bas de page */}
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 font-montserrat italic text-center">
        💡 Assure-toi que ton fichier contient les clés suivantes :
        <br />
        <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
          sourceWord, translatedWord, sourceLanguage, targetLanguage, wordType
        </code>
      </p>
    </div>
  );
};
