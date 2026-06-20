/**
 * Перетворює масив об'єктів у об'єкт-мапу (Record).
 * Ключем стає значення поля `slug`, перетворене з kebab-case (з дефісами)
 * у camelCase (без дефісів).
 *
 * @param {Array<Object>} data - Масив об'єктів, що містять поле `slug`.
 * @returns {Object} Об'єкт, де ключі — camelCase слаги, а значення — оригінальні об'єкти.
 *
 * @example
 * // ath-jamalova-aydan -> athJamalovaAydan
 * const map = createSlugIndexedObjMap(athletesArray);
 */
const createSlugIndexedObjMap = (data) => {
  if (!Array.isArray(data)) return {};

  return data.reduce((acc, item) => {
    if (!item.slug) return acc;

    const camelCaseKey = item.slug
      .split("-")
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join("");

    acc[camelCaseKey] = item;
    return acc;
  }, {});
};

const createCodeIndexedObjMap = (data) => {
  if (!Array.isArray(data)) return {};

  return data.reduce((acc, item) => {
    if (!item.code) return acc;

    acc[item.code] = item;
    return acc;
  }, {});
};

export { createSlugIndexedObjMap, createCodeIndexedObjMap };
