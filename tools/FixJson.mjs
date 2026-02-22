// add-slugs.js
import { readFile, writeFile } from "fs/promises";

function addSlugs(games) {
  return games.map((game) => {
    const slug = game.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      ...game,
      slug,
      newUrl: `{HTML_URL}/${slug}.html`,
      newCover: `{COVER_URL}/${slug}.png`,
    };
  });
}

async function run() {
  const raw = await readFile("./games.json", "utf8");
  const games = JSON.parse(raw);

  if (!Array.isArray(games)) {
    throw new Error("games.json must be a JSON array");
  }

  const updated = addSlugs(games);

  await writeFile(
    "./bgames.json",
    JSON.stringify(updated, null, 2),
    "utf8"
  );

  console.log("bgames.json written");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
