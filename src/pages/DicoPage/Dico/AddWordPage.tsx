import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddWordPage () {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-700 p-6 md:p-8 text-center"
      >
        {/* 🔹 Titre principal */}
        <h1 className="text-2xl md:text-3xl font-montserrat font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Faites grandir votre dictionnaire 🌱
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base font-montserrat mb-6">
          Contribuez à enrichir le dictionnaire communautaire en ajoutant vos
          mots, ou importez-en plusieurs d’un coup !
        </p>

        {/* 🔹 Actions principales */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Bouton 1 */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link
              to="/dico/add-choice/single"
              className="flex flex-row items-center justify-center gap-2 
                         bg-blue-600 hover:bg-blue-700 text-white dark:text-black
                         font-medium px-5 py-3 rounded-xl 
                         shadow-md transition-all duration-300"
            >
              <span>Ajouter un mot</span>
              <GoArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* Bouton 2 */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link
              to="/dico/add-choice/import"
              className="flex flex-row items-center justify-center gap-2 
                         bg-amber-500 hover:bg-amber-600 text-white dark:text-black
                         font-medium px-5 py-3 rounded-xl 
                         shadow-md transition-all duration-300"
            >
              <span>Importer des mots</span>
              <GoArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* 🔹 Bonus : message de motivation */}
        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 font-montserrat italic">
          Chaque mot ajouté aide la communauté à mieux apprendre 🌍
        </p>
      </motion.div>
    </div>
  );
};
