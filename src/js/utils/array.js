/**
 * @typedef {Object} EntityItem
 * @property {string|number} id - Унікальний ідентифікатор.
 */

/**
 * @typedef {Record<string|number, Object>} EntityMap
 */

/**
 * Модуль для роботи з колекціями даних (Array to Object-map lookup).
 */

/**
 * Перетворює масив об'єктів у об'єкт-карту (Map), використовує поле `id` в якості ключа
 *
 * Для швидкого lookup `{ id: obj }` для доступу за O(1).
 *
 * @param {EntityItem[]} arr - Масив об'єктів для претворення. Кожен об'єкт повинен мати `id`.
 * @param {string} label - Назва сутності(колекції) для логування помилок.
 * @returns {EntityMap} Об'єкт, де ключі - це ID, а значення - вихідні об'єкти.
 * @throws {Error} Якщо у елемента відсутній `id` або знайдено дублікат.
 *
 * @example
 * const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const userMap = arrayToMap(users, 'Users');
 * // Результат: { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }
 */
function arrayToMap(arr, label) {
  const map = {};

  for (const item of arr) {
    if (!item.id) {
      throw new Error(`❌ "${label}" item without id`);
    }

    if (map[item.id]) {
      throw new Error(`❌ Duplicate "${label}" id: "${item.id}"`);
    }

    map[item.id] = item;
  }

  return map;
}

/**
 * Безпечно дістає елемент із об'єкт-карти (Map) за його ID.
 *
 * @param {EntityMap} map - Об'єкт-карта, створена за допомогою `arrayToMap`.
 * @param {string|number} id - ID елемента, який потрібно знайти.
 * @param {string} label - Назва сутності для тексту помилки (наприклад, "Media").
 * @param {string|number} parentId - ID батьківської сутності/контейнера (статті/категорії), для контексту помилки.
 * @returns {Object} Знайдений об'єкт.
 * @throws {Error} Якщо елемент із таким ID не знайдено (відсутній у карті).
 *
 * @example
 * const media = getFromMap(mediaMap, mediaId, 'Media', articleId);
 * // Якщо не знайдено, викине помилку: "❌ Media: "media_0042" not found for "art_0101"
 */
function getFromMap(map, id, label, parentId) {
  // Деякі поля можуть бути опціональні
  if (!id) {
    return null;
  }

  const item = map[id];

  if (!item) {
    throw new Error(`❌ ${label}: "${id}" not found! parentId:"${parentId}"`);
  }

  return item;
}

export { arrayToMap, getFromMap };
