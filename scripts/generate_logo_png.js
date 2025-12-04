import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgPath = path.join(__dirname, "../public/kaia-logo-hd.svg");
const svgBuffer = fs.readFileSync(svgPath);

const resolutions = [
  { name: "kaia-logo-1024.png", size: 1024 },
  { name: "kaia-logo-2048.png", size: 2048 },
  { name: "kaia-logo-4096.png", size: 4096 },
];

Promise.all(
  resolutions.map((res) => {
    const outputPath = path.join(__dirname, "../public", res.name);
    return sharp(svgBuffer)
      .png({ quality: 95, effort: 9 })
      .resize(res.size, res.size, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .toFile(outputPath)
      .then(() => console.log(` PNG gerada: ${res.name} (${res.size}x${res.size})`))
      .catch((err) => console.error(`Erro ao gerar ${res.name}:`, err.message));
  })
).then(() => {
  console.log(" Todas as logos em alta definição foram geradas com sucesso!");
  process.exit(0);
}).catch((err) => {
  console.error("Erro geral:", err.message);
  process.exit(1);
});
