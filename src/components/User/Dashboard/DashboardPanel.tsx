import { useState, type FC, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Settings2 } from "lucide-react";

interface DashboardPanelProps {
  childrens: {
    statistic: ReactNode;
    params: ReactNode;
  };
}

export const DashboardPanel: FC<DashboardPanelProps> = ({ childrens }) => {
  const [target, setTarget] = useState<"statistic" | "params">("statistic");

  return (
    <div
      className="w-full max-w-5xl mx-auto font-montserrat 
                 bg-white dark:bg-gray-900 rounded-2xl shadow-md 
                 border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* 🧭 Navbar / Onglets */}
      <div className="flex justify-around items-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button
          onClick={() => setTarget("statistic")}
          className={`flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-medium transition-all duration-200 ${
            target === "statistic"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Statistiques</span>
        </button>

        <button
          onClick={() => setTarget("params")}
          className={`flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-medium transition-all duration-200 ${
            target === "params"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <Settings2 className="w-5 h-5" />
          <span>Paramètres</span>
        </button>
      </div>

      {/* 🪄 Contenu avec animation */}
      <div className="p-6 sm:p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {target === "statistic" ? (
            <motion.div
              key="statistic"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {childrens.statistic}
            </motion.div>
          ) : (
            <motion.div
              key="params"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {childrens.params}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
