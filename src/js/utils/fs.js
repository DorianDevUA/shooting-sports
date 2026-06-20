import fs from "fs";
import path from "path";

// Читаємо JSON файл
/**
 * Безпечне читання JSON файлу
 * - читає файл
 * - перевіряє, що він не пустий
 * - парсить у JS-обʼєкт
 */
function readJSON(filePath) {
  console.log(`📄 Reading: ${filePath}`);

  const raw = fs.readFileSync(filePath, "utf-8");

  if (!raw.trim()) {
    throw new Error(`❌ File is empty: ${filePath}`);
  }

  return JSON.parse(raw);
}

// Записуємо JSON файл
function writeJSON(filePath, data) {
  const dir = path.dirname(filePath);

  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export { readJSON, writeJSON };
