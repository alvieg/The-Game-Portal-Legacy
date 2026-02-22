// save-json.js
import { writeFile } from "fs/promises";

const SOURCE_URL = "https://cdn.jsdelivr.net/gh/gn-math/assets@main/zones.json"; // change this
const OUTPUT_FILE = "./games.json";

async function run() {
  const res = await fetch(SOURCE_URL);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  await writeFile(OUTPUT_FILE, JSON.stringify(json, null, 2), "utf8");
  console.log(`Saved JSON to ${OUTPUT_FILE}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
