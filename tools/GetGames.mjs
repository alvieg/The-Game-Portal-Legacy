// download-from-local-json.js
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const JSON_PATH = "./bgames.json"; // local file
const HTML_BASE = "https://cdn.jsdelivr.net/gh/gn-math/html@main/";
const OUTPUT_DIR = "../static/games";

async function run() {
  const raw = await readFile(JSON_PATH, "utf8");
  const games = JSON.parse(raw);

  if (!Array.isArray(games)) {
    throw new Error("games.json must be an array");
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const game of games) {
    if (!game.slug || !game.newUrl) continue;

    const htmlUrl = game.url.replace("{HTML_URL}", HTML_BASE);
    const res = await fetch(htmlUrl);

    if (!res.ok) {
      console.error("Failed:", htmlUrl);
      continue;
    }

    const html = await res.text();
    const filePath = path.join(OUTPUT_DIR, `${game.slug}.html`);

    await writeFile(filePath, html, "utf8");
    console.log("Saved:", filePath);
  }
}

run().catch(console.error);
