import { genderDTO } from "./gender.mapper.js";
import { disciplineDTO } from "./discipline.mapper.js";

/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */
function eventDTO(event) {
  return {
    id: event.id,
    code: event.code,
    slug: event.slug,
    name: event.name,
    format: eventFormatDTO(event.format),
    gender: genderDTO(event.gender),
    discipline: disciplineDTO(event.discipline),
  };
}

function eventFormatDTO(evtFormat) {
  return {
    id: evtFormat.id,
    name: evtFormat.name,
    description: evtFormat.description,
    team_size: evtFormat.team_size,
  };
}

export { eventDTO, eventFormatDTO };
