/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */

function coachDTO(coachRelation) {
  if (!coachRelation) {
    return null;
  }

  const { person, type } = coachRelation;

  return {
    id: person.id,

    slug: person.slug,
    code: person.code,

    first_name: person.first_name,
    last_name: person.last_name,

    full_name: `${person.last_name} ${person.first_name}`,

    type: {
      id: type.id,
      code: type.code,
      name: type.name,
    },

    started_at: coachRelation.started_at,
    ended_at: coachRelation.ended_at,

    is_primary: coachRelation.is_primary,
  };
}

export { coachDTO };
