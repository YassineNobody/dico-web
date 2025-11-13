import { Link } from "react-router-dom";
import { SpotlightCard } from "../Cards/SportlightCard";
import { BookText } from "lucide-react";

export const CardDictionary = () => {
  return (
    <SpotlightCard
      props={{
        spotlightColor: "rgba(255, 255, 255, 0.15)",
      }}
    >
      <div className="flex flex-col items-start text-left font-montserrat text-white max-w-xs">
        {/* 📚 Emoji / Icône */}
        <span className="text-3xl mb-2">📖</span>

        {/* 🏷️ Titre */}
        <h3 className="text-xl font-semibold text-amber-400 tracking-wide mb-2">
          Dictionnaire arabe-français
        </h3>
        <p className="text-sm text-gray-300 leading-snug mb-4">
          Cherche, ajoute et mémorise des mots en arabe et en français. Crée ton
          propre dictionnaire personnalisé.
        </p>

        {/* 🔗 Lien */}
        <Link
          to="/dico/public"
          className="flex items-center gap-2 text-sm text-amber-400 font-medium hover:text-amber-300 transition-colors"
        >
          <BookText size={16} />
          Ouvrir le dictionnaire
        </Link>
      </div>
    </SpotlightCard>
  );
};
