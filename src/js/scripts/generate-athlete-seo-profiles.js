// =======================================
// build-athletes.js
// Скрипт для генерації фінального athletes.json
// з усіх source файлів та першорівневих сутностей
// =======================================

import fs from "fs";
import path from "path";

import { readJSON } from "../utils/fs.js";

// Папка з сирими даними
const SRC = "src/database/raw/entities";

// Папка для згенерованих файлів
const OUT = "src/data/global";

/**
 * Шлях до вхідного та вихідного файлу
 */
const paths = {
  profiles: path.join(SRC, "people.json"),
  output: path.join(OUT, "athlete-seo.json"),
};

function arrayToMap(arr, label) {
  const map = {};

  for (const item of arr) {
    if (!item.code) {
      throw new Error(`❌ "${label}" item without code`);
    }

    if (map[item.code]) {
      throw new Error(`❌ Duplicate "${label}" id: "${item.code}"`);
    }

    map[item.code] = item;
  }

  return map;
}

// Будуємо вихідний файл
function buildAthleteProfilesSEO() {
  console.log("📄 Читаємо базові дані...");

  // 2️⃣ Парсимо базовий JSON файл і зберігаємо у змінну
  /**
   * Базовий вхідний масив з JSON файлу
   */
  const athletesData = readJSON(paths.profiles);

  /**
   * 4️⃣ Будуємо фінальний масив атлетів з резолвом залежностей
   */
  const athletes = athletesData.map((athlete) => {
    // Структура фінального об'єкта
    return {
      // Базові поля

      code: athlete.code,
      slug: athlete.slug,
      url: `athletes/${athlete.slug}/`,
      canonical: `https://doriandevois.github.io/aze-shooting/athletes/${athlete.slug}/`,
      seo: {
        title: `Athlete ${athlete.last_name} ${athlete.first_name}`,
        description: "",
        keywords: "",
        image: "assets/images/social/social-preview-1200x630.jpg",
      },
      breadcrumbs: [
        { label: "Home", path: "" },
        { label: "Athletes", path: "athletes/" },
        { label: `${athlete.last_name} ${athlete.first_name}`, path: null },
      ],
    };
  });

  /**
   * 5️⃣ Захищаємо від випадкових мутацій.
   */
  Object.freeze(athletes);

  /**
   * 6️⃣ Гарантуємо, що папка generated існує.
   * Створюємо папку, якщо її ще немає
   */
  fs.mkdirSync(OUT, { recursive: true });

  // 7️⃣ Записуємо фінальний файл
  fs.writeFileSync(
    paths.output,
    JSON.stringify(arrayToMap(athletes), null, 2),
    "utf-8",
  );

  console.log("✅ Athlete SEO generated");
  console.log(`✅ Generated: ${athletes.length} Athlete Profiles`);
  console.log(`✅ Saved to: ${paths.output}`);
}

// Запускаємо script
try {
  buildAthleteProfilesSEO();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
