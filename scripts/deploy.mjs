import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const envPath = path.join(rootDir, ".env");
const distDir = path.join(rootDir, "dist-ftp");

console.log("\n🚀 [1/3] Preparando deploy...\n");

// 1. Carregar variáveis do .env
if (fs.existsSync(envPath)) {
  if (typeof process.loadEnvFile === "function") {
    process.loadEnvFile(envPath);
  } else {
    const envContent = fs.readFileSync(envPath, "utf8");
    for (const line of envContent.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx > -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
        process.env[key] = val;
      }
    }
  }
} else {
  console.error("❌ Arquivo .env não encontrado!");
  console.log("👉 Crie o arquivo .env com base no .env.example com suas credenciais do FTP:");
  console.log(`
FTP_HOST=ftp.seudominio.com.br
FTP_USER=seu_usuario
FTP_PASSWORD=sua_senha
FTP_REMOTE_PATH=/public_html/gabriel
FTP_PORT=21
FTP_PROTOCOL=ftp
`);
  process.exit(1);
}

const host = process.env.FTP_HOST;
const user = process.env.FTP_USER;
const password = process.env.FTP_PASSWORD;
const remotePath = process.env.FTP_REMOTE_PATH || "/public_html/gabriel";
const port = process.env.FTP_PORT || "21";
const protocol = process.env.FTP_PROTOCOL || "ftp";

if (!host || !user || !password) {
  console.error("❌ Credenciais FTP incompletas no arquivo .env!");
  console.error("Certifique-se de preencher FTP_HOST, FTP_USER e FTP_PASSWORD.");
  process.exit(1);
}

if (host.includes("seudominio") || user.includes("seu_usuario")) {
  console.error("⚠️ Atenção: Você precisa colocar suas credenciais reais no arquivo .env!");
  console.log("Abra o arquivo .env na pasta do projeto e preencha com o host, usuário e senha da cPanel.");
  process.exit(1);
}

// 2. Localizar WinSCP
const possibleWinSCP = [
  path.join(process.env.LOCALAPPDATA || "", "Programs", "WinSCP", "WinSCP.com"),
  "C:\\Program Files (x86)\\WinSCP\\WinSCP.com",
  "C:\\Program Files\\WinSCP\\WinSCP.com",
];

let winscpPath = possibleWinSCP.find((p) => fs.existsSync(p));

if (!winscpPath) {
  try {
    const whereRes = execSync("where winscp.com", { encoding: "utf8" }).trim();
    if (whereRes) winscpPath = whereRes.split(/\r?\n/)[0];
  } catch {}
}

if (!winscpPath) {
  console.error("❌ WinSCP.com não foi localizado no sistema!");
  process.exit(1);
}

// 3. Executar o Build
console.log("🔨 [2/3] Gerando build de produção em dist-ftp/...");
try {
  execSync(`node "${path.join(__dirname, "build-ftp.mjs")}"`, {
    cwd: rootDir,
    stdio: "inherit",
  });
} catch (err) {
  console.error("❌ Falha no build!", err);
  process.exit(1);
}

// 4. Sincronizar via WinSCP
console.log(`\n📤 [3/3] Enviando arquivos para ${host}:${remotePath} via WinSCP...`);

const tempScriptPath = path.join(rootDir, `.winscp-script-${Date.now()}.txt`);
const winscpLogPath = path.join(rootDir, "winscp-deploy.log");

const encodedUser = encodeURIComponent(user);
const encodedPass = encodeURIComponent(password);
const sessionUrl = `${protocol}://${encodedUser}:${encodedPass}@${host}:${port}/`;

// Usamos synchronize remote para enviar apenas arquivos modificados ou put -overwrite
const scriptContent = `
option batch on
option confirm off
open "${sessionUrl}" -passive=on
synchronize remote "${distDir}" "${remotePath}"
exit
`.trim();

fs.writeFileSync(tempScriptPath, scriptContent, "utf8");

try {
  const result = spawnSync(
    winscpPath,
    [`/script=${tempScriptPath}`, `/log=${winscpLogPath}`],
    {
      cwd: rootDir,
      stdio: "inherit",
    }
  );

  if (result.status === 0) {
    console.log("\n✅ Deploy concluído com sucesso! O site já está atualizado no ar! 🚀\n");
  } else {
    console.error(`\n❌ Falha no envio do WinSCP (código ${result.status}).`);
    console.error(`Verifique o arquivo de log para detalhes: ${winscpLogPath}\n`);
    process.exit(result.status || 1);
  }
} finally {
  if (fs.existsSync(tempScriptPath)) {
    fs.unlinkSync(tempScriptPath);
  }
}
