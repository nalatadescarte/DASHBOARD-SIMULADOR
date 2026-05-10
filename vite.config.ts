import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// ─── Plugin: lê Contexto Técnico/*.md e gera territorios-auto.json ───────────
function nalataTerritoriosPlugin(): Plugin {
  const CONTEXTO_DIR = path.resolve(__dirname, "Contexto Técnico");
  const OUTPUT_FILE = path.resolve(__dirname, "src/data/territorios-auto.json");

  function parseFrontMatter(content: string): Record<string, string> | null {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return null;
    const result: Record<string, string> = {};
    for (const line of match[1].split(/\r?\n/)) {
      const m = line.match(/^(nalata_\w+):\s*"?([^"#\n]*?)"?\s*$/);
      if (m) result[m[1]] = m[2].trim();
    }
    return Object.keys(result).some(k => k === "nalata_id") ? result : null;
  }

  function generateTerritorios() {
    if (!fs.existsSync(CONTEXTO_DIR)) {
      fs.writeFileSync(OUTPUT_FILE, "[]", "utf-8");
      return;
    }

    const files = fs.readdirSync(CONTEXTO_DIR).filter(f => f.endsWith(".md"));
    const territorios: object[] = [];

    for (const filename of files) {
      const content = fs.readFileSync(path.join(CONTEXTO_DIR, filename), "utf-8");
      const fm = parseFrontMatter(content);
      if (!fm || !fm.nalata_id) continue;

      const latasAlvoM12 = parseInt(fm.nalata_latasAlvoM12 ?? "280");
      const precoMinimo  = parseFloat(fm.nalata_precoMinimo  ?? "80");
      const precoMaximo  = parseFloat(fm.nalata_precoMaximo  ?? "120");
      const cidade       = fm.nalata_label ?? fm.nalata_id;

      territorios.push({
        id: fm.nalata_id,
        label: cidade,
        arquivo: filename,
        latasAlvoM12,
        precoMinimoSugerido: precoMinimo,
        precoMaximoSugerido: precoMaximo,
        data: {
          cidade,
          qtdObras:      fm.nalata_qtdObras      ?? "",
          qtdEdif:       fm.nalata_qtdEdif        ?? "",
          qtdCond:       fm.nalata_qtdCond        ?? "",
          qtdConst:      fm.nalata_qtdConst       ?? "",
          qtdCltes:      fm.nalata_qtdCltes       ?? "",
          latasAlvo:     String(latasAlvoM12),
          score:         fm.nalata_score          ?? "0",
          taxaConversao: fm.nalata_taxaConversao  ?? "0",
        },
      });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(territorios, null, 2), "utf-8");
    console.log(`[nalata] ${territorios.length} território(s) carregado(s) de "Contexto Técnico/"`);
  }

  return {
    name: "nalata-territorios",
    buildStart() {
      generateTerritorios();
    },
    configureServer(server) {
      server.watcher.add(path.join(CONTEXTO_DIR, "**/*.md"));
      const reload = (file: string) => {
        if (!file.includes("Contexto")) return;
        generateTerritorios();
        // Invalida o módulo do JSON para forçar re-import
        const mod = server.moduleGraph.getModuleById(OUTPUT_FILE);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add",    reload);
      server.watcher.on("change", reload);
      server.watcher.on("unlink", reload);
    },
  };
}

// ─── Plugin: copia APRESENTAÇÃO SIMULAÇÕES/ → public/apresentacao/ ────────────
function copiarApresentacaoPlugin(): Plugin {
  const SRC_DIR  = path.resolve(__dirname, "APRESENTAÇÃO SIMULAÇÕES");
  const DEST_DIR = path.resolve(__dirname, "public/apresentacao");
  const RENAME: Record<string, string> = {
    "LOGO COMPLETO NALATA.png": "logo_completo.png",
    "LOGO NALATA.png": "logo_icone.png",
  };

  function syncFiles() {
    if (!fs.existsSync(SRC_DIR)) return;
    if (!fs.existsSync(DEST_DIR)) fs.mkdirSync(DEST_DIR, { recursive: true });
    const files = fs.readdirSync(SRC_DIR).filter(f => /\.(png|jpg|jpeg|gif|webp)$/i.test(f));
    for (const file of files) {
      const dest = RENAME[file] ?? file;
      fs.copyFileSync(path.join(SRC_DIR, file), path.join(DEST_DIR, dest));
    }
  }

  return {
    name: "nalata-apresentacao",
    buildStart() { syncFiles(); },
    configureServer(server) {
      server.watcher.add(path.join(SRC_DIR, "**/*.{png,jpg,jpeg}"));
      server.watcher.on("add",    (f) => { if (f.includes("APRESENTA")) syncFiles(); });
      server.watcher.on("change", (f) => { if (f.includes("APRESENTA")) syncFiles(); });
    },
  };
}

// ─── Vite config ──────────────────────────────────────────────────────────────
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    nalataTerritoriosPlugin(),
    copiarApresentacaoPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
