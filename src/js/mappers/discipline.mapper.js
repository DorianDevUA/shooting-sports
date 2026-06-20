/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */
function disciplineDTO(discipline) {
  return {
    id: discipline.id,
    code: discipline.code,
    slug: discipline.slug,
    name: discipline.name,
    distance: distanceDTO(discipline.distance),
    category: disciplineCategoryDTO(discipline.category),
    description: discipline.description,
  };
}

function distanceDTO(distance) {
  if (!distance) {
    return null;
  }

  return {
    id: distance.id,
    label: distance.label,
    value: distance.value,
    unit: distance.unit,
  };
}

function disciplineCategoryDTO(category) {
  return {
    id: category.id,
    slug: category.slug,
    code: category.code,

    name: category.name,
    description: category.description,

    sort_order: category.sort_order,
  };
}

export { disciplineDTO, distanceDTO, disciplineCategoryDTO };
