import LiquidEther from "../../components/Home/BackgroundHome";
import { HomeContent } from "../../components/Home/HomeContent";
import { SectionHome } from "../../components/Home/SectionHome";

 const HomePage = () => {
  return (
    <div className="">
      {/* 🌊 Fond WebGL */}
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
      <HomeContent />
      <SectionHome />
    </div>
  );
};


export default HomePage;