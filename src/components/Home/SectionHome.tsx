import LiquidEther from "./BackgroundHome";
import { CardDictionary } from "./CardDico";
import { CardLearnArabic } from "./CardLearnArabic";

export const SectionHome = () => {
  return (
    <section className="relative min-h-screen text-white text-3xl font-bold">
      <div
        style={{ width: "100%", height: "100vh", position: "relative" }}
        className=""
      >
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center
                 text-white text-center px-4"
      >
        {/* 🏷️ Titre principal */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider mb-12 text-center">
          Explore tous les horizons
        </h2>

        {/* 🧩 Grille des cartes */}
        <div
        className="flex flex-col gap-10 md:flex-row items-center"
        >
          <CardLearnArabic />
          <CardDictionary />
        </div>
      </div>
    </section>
  );
};
