import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CreateWordForm } from "../../../components/Dico/CreateWordForm";
import { motion } from "framer-motion";

export const AddSingleWordPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 pt-26 bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 relative">
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
        <h1 className="text-center text-2xl md:text-3xl font-montserrat font-semibold text-blue-900 dark:text-blue-100 mb-8">
          Ajouter un mot dans le dictionnaire
        </h1>

        {/* ✅ Le formulaire sans carte supplémentaire */}
        <CreateWordForm />
      </motion.div>

      {/* 🧠 Message bas de page */}
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 font-montserrat italic text-center">
        ✨ Chaque mot ajouté aide à faire grandir la base de connaissance
        linguistique.
      </p>
    </div>
  );
};
