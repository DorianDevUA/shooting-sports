import { ageCategoryDTO } from "./competition.mapper.js";
import { disciplineCategoryDTO } from "./discipline.mapper.js";


/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */
function teamDTO(team) {
  return {
    id: team.id,
    slug: team.slug,
    name: team.name,
    short_name: team.short_name,
    description: team.description,
    team_type: teamTypeDTO(team.team_type),
    age_category: ageCategoryDTO(team.age_category),
    team_section: teamSectionDTO(team.team_section),
    squad: squadDTO(team.squad),
    selection_reason: selectionReasonDTO(team.selection_reason),
    selection_date: team.selection_date,
    joined_at: team.joined_at,
    left_at: team.left_at,
    sort_order: team.sort_order,
  };
}

function teamTypeDTO(type) {
  return {
    id: type.id,
    slug: type.slug,
    code: type.code,
    name: type.name,
    short_name: type.short_name,
    description: type.description,
    sort_order: type.sort_order,
  };
}

function teamSectionDTO(section) {
  return {
    id: section.id,
    slug: section.slug,
    code: section.code,
    name: section.name,
    short_name: section.short_name,
    discipline_category: disciplineCategoryDTO(section.discipline_category),
    description: section.description,
    sort_order: section.sort_order,
  };
}

function squadDTO(squad) {
  return {
    id: squad.id,
    slug: squad.slug,
    name: squad.name,
    description: squad.description,
    sort_order: squad.sort_order,
  };
}

function selectionReasonDTO(reason) {
  return {
    id: reason.id,
    name: reason.name,
    type: reason.type,
    description: reason.description,
    sort_order: reason.sort_order,
  };
}

export { teamDTO };
