import { InfosSettingsUser } from "./InfosSettingsUser";
import { Settings2 } from "lucide-react";
import { motion } from "framer-motion";

export const InfosSettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 w-full flex flex-col items-center justify-center px-4 py-10"
    >
      <div
        className="w-full max-w-3xl bg-white dark:bg-gray-900 
                   dark:shadow-gray-800/20 
                   p-6 sm:p-10 flex flex-col gap-6"
      >
        {/* 🧭 En-tête */}
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40">
            <Settings2 className="text-blue-600 dark:text-blue-400 w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 font-montserrat">
            Paramètres du dictionnaire
          </h2>
        </div>

        {/* ⚙️ Contenu principal */}
        <div className="flex flex-col gap-6">
          <InfosSettingsUser />
        </div>

        {/* 💡 Note ou astuce */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic">
          💡 Tes préférences sont enregistrées automatiquement. Tu peux les
          réinitialiser à tout moment.
        </p>
      </div>
    </motion.div>
  );
};
