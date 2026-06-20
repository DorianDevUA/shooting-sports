/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */

import { disciplineCategoryDTO } from "./discipline.mapper.js";
import { eventDTO } from "./event.mapper.js";
import { cityDTO, venueDTO } from "./geo.mapper.js";
import { mediaDTO } from "./media.mapper.js";
import { organizationDTO } from "./organization.mapper.js";

function competitionEditionDTO(edition) {
  const disciplineCategories = getCompetitionEditionDisciplineCategories(
    edition.events,
  );

  return {
    id: edition.id,
    slug: edition.slug,
    code: edition.code,

    name: edition.name,
    short_name: edition.short_name,
    excerpt: edition.excerpt,

    competition: competitionDTO(edition.competition),
    category: competitionCategoryDTO(edition.category),
    status: getCompetitionEditionStatus(edition.start_date, edition.end_date),
    disciplines: disciplineCategories.map(disciplineCategoryDTO),
    events: edition.events?.map(competitionEventDTO) ?? [],
    organizations: competitionOrganizationsDTO(edition.organizations),

    venue: venueDTO(edition.venue),
    city: cityDTO(edition.city),

    start_date: edition.start_date,
    end_date: edition.end_date,

    media: competitionMediaDTO(edition.media),

    source_url: edition.source_url,
    notes: edition.notes,
  };
}

function competitionDTO(competition) {
  return {
    id: competition.id,
    slug: competition.slug,
    code: competition.code,

    name: competition.name,
    short_name: competition.short_name,

    level: competitionLevelDTO(competition.level),
    description: competition.description,
  };
}

function competitionEventDTO(compEvent) {
  return {
    id: compEvent.id,
    slug: compEvent.slug,
    code: compEvent.code,

    event: eventDTO(compEvent.event),
    age_category: ageCategoryDTO(compEvent.age_category),

    source_url: compEvent.source_url,
    notes: compEvent.notes,
  };
}

function competitionCategoryDTO(category) {
  return {
    id: category.id,
    slug: category.slug,
    code: category.code,

    name: category.name,
    short_name: category.short_name,

    description: category.description,
  };
}

function competitionLevelDTO(level) {
  return {
    id: level.id,
    slug: level.slug,
    code: level.code,

    name: level.name,
    description: level.description,
  };
}

function ageCategoryDTO(category) {
  if (!category) {
    return null;
  }

  return {
    id: category.id,
    slug: category.slug,
    code: category.code,
    name: category.name,
    min_age: category.min_age,
    max_age: category.max_age,
    description: category.description,
  };
}

function competitionMediaDTO(relations = []) {
  const media = {
    cover: null,
    thumbnail: null,
  };

  if (!relations.length) {
    return media;
  }

  for (const relation of relations) {
    const usageType = relation.media_usage_type.id;

    if (usageType === "cover" || usageType === "thumbnail") {
      if (!media[usageType] || relation.is_primary) {
        media[usageType] = mediaDTO(relation.media);
      }
    }
  }

  return media;
}

function competitionOrganizationsDTO(relations = []) {
  const organizations = {
    organizer: null,
    host: null,
  };

  for (const relation of relations) {
    const role = relation.role?.code ?? relation.role?.id;
    const organization = organizationDTO(relation.organization);

    if (role === "organizer") {
      organizations.organizer = organization;
    } else if (role === "host") {
      organizations.host = organization;
    }
  }

  return organizations;
}

function getCompetitionEditionStatus(start, end) {
  const COMPETITION_STATUSES = {
    SCHEDULED: "scheduled",
    LIVE: "live",
    COMPLETED: "completed",
  };

  const currentDate = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (currentDate < startDate) {
    return COMPETITION_STATUSES.SCHEDULED;
  }

  if (currentDate >= startDate && currentDate <= endDate) {
    return COMPETITION_STATUSES.LIVE;
  }

  return COMPETITION_STATUSES.COMPLETED;
}

/**
 * Повертає унікальні категорії дисциплін,
 * представлені на змаганні.
 */
function getCompetitionEditionDisciplineCategories(events) {
  const categoriesMap = new Map();

  for (const competitionEvent of events) {
    const category = competitionEvent.event?.discipline?.category;

    if (!category) {
      continue;
    }

    categoriesMap.set(category.id, category);
  }

  return Array.from(categoriesMap.values());
}

export {
  competitionLevelDTO,
  competitionDTO,
  competitionEditionDTO,
  ageCategoryDTO,
  competitionOrganizationsDTO,
};
