// Singapore in Numbers — the hand-in program (Node 22, standard library only).
//
// The site itself is the static files in app/: one index.html, plain scripts,
// one stylesheet, and the indicator catalogue. Nothing it shows or runs is
// fetched from the network, so the grader can read it without one.
//
// This program hands the site in. It copies app/ and screenshots/ from
// beside this file into the output directory and writes dossier.json there:
// the summary the judge reads, built by the vendored make.fun library, so
// the dossier is byte for byte what the scorer's own copy writes. Leave
// vendor/makefun-frontend.ts exactly as the kit shipped it.
//
// Inside the grader the output directory is /output. Anywhere else, set
// MAKEFUN_OUTPUT_DIR to say where the hand-in goes:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// The repository root: the directory this file lives in.
const root = fileURLToPath(new URL(".", import.meta.url));

// The grader's output directory, or the local stand-in.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function handIn() {
  mkdirSync(outputDir, { recursive: true });

  // The whole site, as it stands.
  cpSync(join(root, "app"), join(outputDir, "app"), { recursive: true });

  // The screenshots, when they exist yet.
  const shots = join(outputDir, "screenshots");
  mkdirSync(shots, { recursive: true });
  if (existsSync(join(root, "screenshots"))) {
    cpSync(join(root, "screenshots"), shots, { recursive: true });
  }

  // The judge's summary: screenshots, first-load bytes, and the source
  // outline. The caps are the scorer's own, so a hand-in that passes here
  // is one the scorer accepts.
  const dossier = buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  });
  writeFileSync(join(outputDir, "dossier.json"), dossier);
}

handIn();
