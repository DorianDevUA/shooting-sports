import fs from "fs";
import path from "path";

import { readJSON } from "../utils/fs.js";

// Папка з сирими даними
const SRC = "public/assets/data";
const OUT = "src/pages/athletes";

const athletes = readJSON(path.join(SRC, "athletes.json"));

athletes.forEach((athlete) => {
  const dir = path.join(OUT, athlete.slug);

  // створюємо папку
  fs.mkdirSync(dir, { recursive: true });

  // створюємо index.html
  const content = `{{> layouts/pages/athlete/index page=seo.${athlete.code}}}`;

  console.log(content);
  fs.writeFileSync(path.join(dir, "index.hbs"), content);
});

console.log("✅ Athlete pages generated");
