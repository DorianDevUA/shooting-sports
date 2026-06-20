import fs from "fs";
import path from "path";

import { readJSON } from "../utils/fs.js";
import { buildAthleteBreadcrumbs } from "../utils/breadcrumbs.js";

// Папка з сирими даними
const SRC = "public/assets/data";

const OUT_DIR = "src/pages/athletes";

const athletes = readJSON(path.join(SRC, "athletes.json"));
console.log("myAthletes", athletes);

athletes.forEach((athlete) => {
  const dir = path.join(OUT_DIR, athlete.slug);

  // створюємо папку
  fs.mkdirSync(dir, { recursive: true });

  // створюємо index.html
  const content = `
  <html lang="en">
  {{!-- Head --}}
  {{> layouts/head/index page=profiles.${athlete.code}}}
  {{!-- Body --}}
  <body data-page="athlete">
    {{!-- Header --}}
    {{> layouts/header/index }}
    {{!-- Main --}}
    <main class="page-content">
      {{!-- Page Hero Section --}}
      {{> layouts/hero/index page=profiles.${athlete.code}}}
      <div class="js-athlete-page"></div>
    </main>
    {{!-- Footer --}}
    {{> layouts/footer/index}}
    {{!-- Modal Backdrop --}}
    {{> components/backdrop/backdrop}}
    {{!-- Page Scripts --}}
    <script type="module" src="/src/js/main.js"></script>
  </body>
</html>`;

  fs.writeFileSync(path.join(dir, "index.hbs"), content);
});

console.log("✅ Athlete pages generated");
