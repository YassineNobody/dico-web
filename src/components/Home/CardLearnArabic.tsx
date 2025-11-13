import { Link } from "react-router-dom";
import { SpotlightCard } from "../Cards/SportlightCard";
import { BookOpen } from "lucide-react";

export const CardLearnArabic = () => {
  return (
    <SpotlightCard
      props={{
        spotlightColor: "rgba(0, 229, 255, 0.15)",
      }}
    >
      <div className="flex flex-col items-start text-left font-montserrat text-white max-w-xs">
        {/* 🇸🇦 Emoji / Icône */}
        <span className="text-3xl mb-2">🇸🇦</span>

        <h3 className="text-xl font-semibold text-blue-400 tracking-wide mb-2">
          Apprendre l’arabe
        </h3>
        <p className="text-sm text-gray-300 leading-snug mb-4">
          Découvre la langue du Coran et progresse à ton rythme avec des cours
          clairs et inspirants.
        </p>

        {/* 📖 Bouton simple */}
        <Link
          to="/learn-arabic"
          className="flex items-center gap-2 text-sm text-indigo-200 font-medium hover:text-indigo-100 transition-colors"
        >
          <BookOpen size={16} />
          Explorer
        </Link>
      </div>
    </SpotlightCard>
  );
};
