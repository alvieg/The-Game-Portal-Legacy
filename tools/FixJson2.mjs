// replace-with-slug.js
import { readFile, writeFile } from "fs/promises";

function addSlugAndReplace(games) {
  return games.map((game) => {
    const slug = game.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      ...game,
      slug,
      url: `{HTML_URL}/${slug}.html`,
      cover: `{COVER_URL}/${slug}.png`,
    };
  });
}

async function run() {
  const raw = await readFile("./games.json", "utf8");
  const games = JSON.parse(raw);

  if (!Array.isArray(games)) {
    throw new Error("games.json must be an array");
  }

  const updated = addSlugAndReplace(games);

  await writeFile(
    "./cgames.json",
    JSON.stringify(updated, null, 2),
    "utf8"
  );

  console.log("games.with-slug.json written");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
