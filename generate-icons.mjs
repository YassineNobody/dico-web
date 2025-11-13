import sharp from "sharp";
import { mkdirSync, existsSync, writeFileSync } from "fs";

const input = "public/favicon.png";
const outputDir = "public/icons";
const manifestPath = "public/manifest.json";

// Ta liste de tailles standard PWA
const sizes = [72, 96, 128, 192, 256, 384, 512];

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

(async () => {
  console.log("🚀 Génération des icônes PWA...");

  // 1️⃣ Génère toutes les icônes Android
  for (const size of sizes) {
    await sharp(input)
      .resize(size, size)
      .toFile(`${outputDir}/icon-${size}x${size}.png`);
    console.log(`✅ icon-${size}x${size}.png`);
  }

  // 2️⃣ Génère l’icône Apple Touch
  const appleIconPath = "public/apple-touch-icon.png";
  await sharp(input).resize(180, 180).toFile(appleIconPath);
  console.log(`🍏 apple-touch-icon.png`);

  // 3️⃣ Génère le manifest.json
  const manifest = {
    name: "Arabia World",
    short_name: "Arabia",
    description:
      "Apprends la langue du Coran, explore ton dictionnaire et découvre la beauté de l’arabe.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f10",
    theme_color: "#5227FF",
    icons: sizes.map((size) => ({
      src: `/icons/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  };

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log("🧩 manifest.json généré avec succès !");
  console.log("✅ Tous les assets PWA sont prêts !");
})();
