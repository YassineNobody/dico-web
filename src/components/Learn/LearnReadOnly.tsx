import type { FC } from "react";
import type { Learn } from "../../interfaces/learn/learn";
import type { LearnCategories } from "../../interfaces/learnCategories/learnCategories";
import { ViewerPdfDocument } from "../Pdf/ViewerPdfLearn";
import { LearnMenuDropdown } from "./MenuOtherLearnByCategory";
import { motion } from "framer-motion";
import { useMenuLearn } from "../../hooks/useMenuLearnCategories";

interface LearnReadOnlyProps {
  cat: LearnCategories;
  learns: Learn[];
  selected: Learn;
}

export const LearnReadOnly: FC<LearnReadOnlyProps> = ({
  cat,
  learns,
  selected,
}) => {
  const { menu } = useMenuLearn();
  return (
    <div className="relative flex flex-col">
      {/* 🔹 Menu flottant (en haut à droite) */}
      <LearnMenuDropdown
        learns={learns}
        selected={selected}
        categorySlug={cat.slug}
        categories={menu}
      />

      {/* 🔹 En-tête du cours */}
      <div className="py-6 px-4 flex flex-col md:mt-0 mt-10 items-center justify-center text-center relative">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl md:text-3xl font-montserrat font-semibold tracking-wide text-emerald-800 dark:text-amber-400"
        >
          {selected.title}
        </motion.h1>
      </div>

      {/* 🔹 Affichage du document */}
      <div className="flex-1 w-full flex justify-center items-center py-6 px-3">
        <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <ViewerPdfDocument data={selected} />
        </div>
      </div>
    </div>
  );
};
