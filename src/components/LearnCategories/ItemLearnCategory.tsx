import type { FC } from "react";
import type { LearnCategories } from "../../interfaces/learnCategories/learnCategories";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const ItemLearnCategoy: FC<{ item: LearnCategories }> = ({ item }) => {
  const { name, slug } = item;
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="w-full">
      <Link
        to={`/learn-arabic/${slug}?mode=box`}
        className={`
          group flex flex-row items-center justify-between 
          py-3 px-4 md:px-6 rounded-xl border border-gray-200 
          dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm 
          hover:bg-amber-50 dark:hover:bg-rose-900/30 
          transition-all duration-300 ease-out
        `}
      >
        {/* 🏷️ Nom de la catégorie */}
        <span
          className="md:text-lg font-montserrat tracking-wide 
                     text-gray-800 dark:text-gray-100 
                     group-hover:text-amber-700 dark:group-hover:text-amber-400
                     transition-colors duration-300"
        >
          {name}
        </span>

        {/* 🡪 Flèche animée */}
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 250, damping: 15 }}
          className="text-gray-600 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400"
        >
          <ArrowRight size={22} />
        </motion.span>
      </Link>
    </motion.div>
  );
};
