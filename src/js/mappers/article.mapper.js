/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */
function statusDTO(status) {
  return {
    id: status.id,
    code: status.code,
    name: status.name,
    description: status.description,
  };
}

function categoryDTO(category) {
  return {
    id: category.id,
    slug: category.slug,
    code: category.code,
    name: category.name,
    description: category.description,
  };
}

export { statusDTO, categoryDTO };
