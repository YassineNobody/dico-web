import { type FC, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import {
  EllipsisVertical,
  BookOpen,
  Layers3,
  ArrowLeft,
  Download,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Learn } from "../../interfaces/learn/learn";
import type { LearnCategories } from "../../interfaces/learnCategories/learnCategories";

interface LearnMenuDropdownProps {
  learns: Learn[];
  selected: Learn;
  categorySlug: string;
  categories?: LearnCategories[];
}

export const LearnMenuDropdown: FC<LearnMenuDropdownProps> = ({
  learns,
  selected,
  categorySlug,
  categories = [],
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const [menuState, setMenuState] = useState<"main" | "courses" | "categories">(
    "main"
  );

  const handleDownload = async () => {
    const { urlPdf, title } = selected;
    try {
      setIsDownloading(true);
      const response = await fetch(urlPdf);
      if (!response.ok) throw new Error("Erreur lors du téléchargement du PDF");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${title || "document"}.pdf`;
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      alert("❌ Impossible de télécharger le document pour le moment.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-50 text-black dark:text-white">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton
          className="p-2 flex flex-row items-center gap-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 
                     dark:hover:bg-gray-700 transition-colors border border-gray-300 
                     dark:border-gray-600 focus:outline-none"
          aria-label="Ouvrir le menu"
        >
          <span className="font-montserrat text-sm text-gray-600 dark:text-gray-300">
            Menu
          </span>
          <EllipsisVertical
            size={18}
            className="text-gray-600 dark:text-gray-300"
          />
        </MenuButton>

        <Transition
          as={motion.div}
          enter="transition ease-out duration-150"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            static
            className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 
                       border border-gray-200 dark:border-gray-700 rounded-lg 
                       shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {menuState === "main" && (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700"
                >
                  {/* ⚙️ Ces boutons ne ferment plus le menu */}
                  <div
                    className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuState("courses");
                    }}
                  >
                    <BookOpen size={16} /> Cours de cette catégorie
                  </div>

                  <div
                    className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuState("categories");
                    }}
                  >
                    <Layers3 size={16} /> Autres catégories
                  </div>

                  {/* Celui-ci ferme le menu naturellement */}
                  <MenuItem>
                    <button
                      disabled={isDownloading}
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition data-focus:bg-gray-100 dark:data-focus:bg-gray-700"
                    >
                      <Download size={16} /> Télécharger le PDF
                    </button>
                  </MenuItem>
                </motion.div>
              )}

              {menuState === "courses" && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-64 overflow-y-auto"
                >
                  <div className="flex items-center gap-2 px-4 py-2 border-b dark:border-gray-700">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuState("main");
                      }}
                      className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Cours disponibles
                    </h4>
                  </div>

                  {learns.map((learn) => {
                    const isSelected = learn.slug === selected.slug;
                    return (
                      <MenuItem key={learn.slug}>
                        <Link
                          to={`/learn-arabic/${categorySlug}?mode=readonly&ref=${learn.slug}`}
                          className={`flex justify-between items-center px-4 py-2 text-sm transition
                            data-focus:bg-gray-100 dark:data-focus:bg-gray-700
                            ${
                              isSelected
                                ? "text-amber-600 dark:text-amber-400 font-medium"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                        >
                          <span className="truncate">{learn.title}</span>
                          {isSelected && <CheckCircle2 size={16} />}
                        </Link>
                      </MenuItem>
                    );
                  })}
                </motion.div>
              )}

              {menuState === "categories" && (
                <motion.div
                  key="categories"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-64 overflow-y-auto"
                >
                  <div className="flex items-center gap-2 px-4 py-2 border-b dark:border-gray-700">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuState("main");
                      }}
                      className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Autres catégories
                    </h4>
                  </div>

                  {categories.map((cat) => (
                    <MenuItem key={cat.slug}>
                      <Link
                        to={`/learn-arabic/${cat.slug}?mode=box`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 data-focus:bg-gray-100 dark:data-focus:bg-gray-700 transition"
                      >
                        {cat.name}
                      </Link>
                    </MenuItem>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};
