import { RotatingText } from "../TextCustom/RotatingText";
import { ChevronDown } from "lucide-react";

export const HomeContent = () => {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center
                 text-white text-center px-4"
    >
      {/* 🔹 Bloc principal */}
      <div className="flex flex-col items-center justify-center gap-6 text-3xl sm:text-4xl md:text-5xl">
        <h1 className="font-montserrat  font-bold tracking-wider">
          Arabia world
        </h1>

        {/* ✅ Conteneur pour forcer le vrai centrage du texte */}
        <div className="w-full flex justify-center">
          <div className="text-center leading-snug">
            <RotatingText />
          </div>
        </div>
      </div>

      {/* 🔹 Bouton "Défilez" */}
      <button
        onClick={scrollToNextSection}
        className="flex flex-col items-center text-sm text-gray-50 absolute bottom-4 z-20 font-montserrat
                   animate-bounce focus:outline-none cursor-pointer select-none"
      >
        <p>Défilez</p>
        <ChevronDown size={20} />
      </button>
    </div>
  );
};
