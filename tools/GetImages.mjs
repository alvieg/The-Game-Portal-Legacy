// download-images-from-local-json.js
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const JSON_PATH = "./bgames.json";
const COVER_BASE = "https://cdn.jsdelivr.net/gh/gn-math/covers@main";
const OUTPUT_DIR = "../static/images";

async function run() {
  const raw = await readFile(JSON_PATH, "utf8");
  const games = JSON.parse(raw);

  if (!Array.isArray(games)) {
    throw new Error("bgames.json must be an array");
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const game of games) {
    if (!game.slug || !game.cover) continue;

    const imageUrl = game.cover.replace("{COVER_URL}", COVER_BASE);
    const res = await fetch(imageUrl);

    if (!res.ok) {
      console.error("Failed:", imageUrl);
      continue;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const filePath = path.join(OUTPUT_DIR, `${game.slug}.png`);

    await writeFile(filePath, buffer);
    console.log("Saved:", filePath);
  }
}

run().catch(console.error);
