import { resolveEntity } from "./resolve-entity.js";

// Приклад:
// Competition Edition
// ├─ competition
// │  └─ level
// ├─ venue
// │  └─ city
// │      └─ country
// │          └─ region
// └─ events[]

/**
 * Рекурсивно будує граф сутностей за схемою.
 *
 * Схема описує:
 * - де шукати сутність (map)
 * - які вкладені поля потрібно підтягнути (fields)
 *
 * @param {Object} schema - Схема поточної сутності
 * @param {Object} maps - Мапи усіх довідників
 * @param {string} context - ID кореневої сутності для тексту помилок
 *
 * @returns {Object|null}
 */
export function resolveEntityGraph(schema, maps, context) {
  // Якщо ID відсутній → зв'язок опціональний → повертаємо null
  // Наприклад: venue_id: null, або city_id: null
  if (schema.id == null) {
    return null;
  }

  // Знаходимо поточну сутність у відповідній мапі.
  const entity = resolveEntity(
    maps[schema.map],
    schema.id,
    schema.label,
    context,
  );

  // Якщо схема не має вкладених полів — повертаємо сутність як є.
  if (!schema.fields) {
    return entity;
  }

  // Створюємо копію сутності, в яку будемо додавати вкладені об'єкти.
  const result = { ...entity };

  // Обходимо та резолвимо всі вкладені поля зі схеми.
  for (const fieldName in schema.fields) {
    const fieldSchema = schema.fields[fieldName];

    // MANY RELATION
    if (fieldSchema.type === "many") {
      /**
       * Беремо всю колекцію.
       *
       * Наприклад:
       *
       * maps.competitionEvents
       * maps.entityMediaRelations
       */
      const collection = Array.from(maps[fieldSchema.collection].values());

      /**
       * Витягуємо умову фільтрації.
       *
       * Наприклад:
       *
       * where: {
       *   competition_edition_id: "$id"
       * }
       *
       */
      const [whereKey, whereValue] = Object.entries(fieldSchema.where)[0];

      // Підміняємо спеціальне значення "$id" на ID поточної сутності.
      const expectedValue = whereValue === "$id" ? entity.id : whereValue;

      // Знаходимо всі записи, які відповідають умові.
      const relatedItems = collection.filter(
        (item) => item[whereKey] === expectedValue,
      );

      // Рекурсивно резолвимо кожен знайдений запис.
      result[fieldName] = relatedItems.map((item) =>
        resolveEntityGraph(
          {
            ...fieldSchema.schema,
            id: item.id,
          },
          maps,
          context,
        ),
      );

      continue;
    }

    // ONE RELATION
    /**
     * За замовчуванням використовуємо convention:
     *
     * city -> city_id
     * country -> country_id
     *
     * Але можна перевизначити:
     * city: {
     *   source: "hometown_id"
     * }
     */
    const sourceField = fieldSchema.source ?? `${fieldName}_id`;

    // Беремо ID дочірньої сутності з поточного об'єкта.
    const childId = entity[sourceField];

    // Рекурсивно будуємо вкладений об'єкт.
    result[fieldName] = resolveEntityGraph(
      {
        ...fieldSchema,
        id: childId,
      },
      maps,
      context,
    );
  }

  return result;
}
