import { readJSON } from "../../utils/fs.js";

function createMapById(items, label) {
  const arr = items.map((item, idx) => {
    if (item.id == null) {
      throw new Error(`❌ ${label} item without id, idx:${idx}`);
    }

    return [item.id, item];
  });

  return new Map(arr);
}

function loadMaps(dependencies) {
  const maps = {};

  for (const key in dependencies) {
    const items = readJSON(dependencies[key]);
    // Назва колекції(довідника) для деталізації тексту помилки
    const label = key[0].toUpperCase() + key.slice(1);

    maps[key] = createMapById(items, label);
  }

  return maps;
}

export { loadMaps, createMapById };
