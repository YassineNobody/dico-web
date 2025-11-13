import { motion } from "framer-motion";
import type { FC } from "react";
import type { Learn } from "../../interfaces/learn/learn";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ItemAllBoxLearnProps {
  learn: Learn;
}

export const ItemAllBoxLearn: FC<ItemAllBoxLearnProps> = ({ learn }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="bg-gray-50 border border-gray-300 rounded-xl max-w-4xl w-full py-4 px-6 
                 font-montserrat flex flex-row justify-between items-center 
                 cursor-pointer select-none transition-all duration-300 ease-out"
      onClick={() =>
        navigate(
          `/learn-arabic/${
            learn.category
              ? `${learn.category.slug}?mode=readonly&ref=${learn.slug}`
              : ""
          }`
        )
      }
    >
      <span className="text-sm sm:text-base tracking-wider font-medium text-green-900">
        {learn.title}
      </span>

      <div className="flex flex-row gap-4 items-center">
        {learn.createdAt && (
          <span className="flex items-center gap-1 text-xs text-gray-600">
            <CalendarDays size={12} />
            {new Date(learn.createdAt).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        )}

        {learn.category && (
          <span
            className="px-2 py-1 text-xs sm:text-sm rounded-md bg-blue-100 
                           dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
          >
            {learn.category.name}
          </span>
        )}
      </div>
    </motion.div>
  );
};
