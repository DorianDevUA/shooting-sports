/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */
function roleDTO(role) {
  return {
    id: role.id,
    code: role.code,
    name: role.name,
  };
}

export { roleDTO };
