import { build } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const indexHtmlPath = path.join(rootDir, "index.html");

const htmlContent = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inkiri DTF</title>
    <meta name="description" content="Uniformes empresariais e de eventos prontos em 24h com DTF e Bordado in-house. Simule sua peça online e receba orçamento no WhatsApp." />
    <meta property="og:title" content="Inkiri DTF" />
    <meta property="og:description" content="Simulador 2D e 3D, estoque a pronta-entrega, DTF e Bordado Industrial. ABC Paulista com envio para todo o Brasil." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="./favicon.ico" type="image/x-icon" />
    <link rel="icon" href="./inkiri-logo.png" type="image/png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;700;800&family=Manrope:wght@400;500;600;700&display=swap" />
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/spa-main.tsx"></script>
  </body>
</html>
`;

fs.writeFileSync(indexHtmlPath, htmlContent, "utf8");

try {
  await build({
    root: rootDir,
    configFile: false,
    base: "./",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "./src"),
      },
    },
    build: {
      outDir: "dist-ftp",
      emptyOutDir: true,
    },
  });
} finally {
  if (fs.existsSync(indexHtmlPath)) {
    fs.unlinkSync(indexHtmlPath);
  }
}
