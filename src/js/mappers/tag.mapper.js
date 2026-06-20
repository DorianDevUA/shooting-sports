/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */
function groupDTO(group) {
  return {
    id: group.id,
    slug: group.slug,
    name: group.name,
    description: group.description,
  };
}

function tagDTO(tag) {
  return {
    id: tag.id,
    slug: tag.slug,
    name: tag.name,
    description: tag.description,
    group: groupDTO(tag.group),
  };
}

export { groupDTO, tagDTO };
