/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */
function genderDTO(gender) {
  return {
    id: gender.id,
    name: gender.name,
  };
}

export { genderDTO };
