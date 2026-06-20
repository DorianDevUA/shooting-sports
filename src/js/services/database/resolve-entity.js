/**
 * Резолвит сущность из мапы по её ID.
 *
 * @param {Map<string | number, any>} map - Коллекция, где ключи — это ID.
 * @param {string|number|null|undefined} id - Идентификатор сущности, которую ищем.
 * @param {string} label - Название типа сущности (используется для сообщения об ошибке).
 * @param {string|number} context - ID родителя или контекст, в котором произошла ошибка.
 * @returns {any|null} Найденная сущность или null, если id не передан.
 * @throws {Error} Выбрасывает ошибку, если id передан, но сущность в мапе отсутствует.
 */

export function resolveEntity(map, id, label, context) {
  // Деякі поля можуть бути опціональні
  if (id == null) {
    return null;
  }

  const entity = map.get(id);

  if (entity === undefined) {
    throw new Error(
      `❌ ${label} with id: "${id}" not found (context: ${context})`,
    );
  }

  return entity;
}
