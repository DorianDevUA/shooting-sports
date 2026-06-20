import path from "path";
import { DB_PATHS } from "./database-paths.js";

const { ENTITIES, REFERENCE, RELATIONS } = DB_PATHS;

export const DATABASE_FILES = {
  // Entities
  entityTypes: path.join(REFERENCE, "entity-types.json"),

  // Persons
  ageCategories: path.join(REFERENCE, "age-categories.json"),
  genders: path.join(REFERENCE, "genders.json"),

  // Disciplines
  disciplines: path.join(ENTITIES, "disciplines.json"),
  disciplineCategories: path.join(REFERENCE, "discipline-categories.json"),
  distances: path.join(REFERENCE, "distances.json"),

  // Events
  events: path.join(ENTITIES, "events.json"),
  eventFormats: path.join(REFERENCE, "event-formats.json"),

  // Competitions
  competitions: path.join(ENTITIES, "competitions.json"),
  competitionEditions: path.join(ENTITIES, "competition-editions.json"),
  competitionCategories: path.join(REFERENCE, "competition-categories.json"),
  competitionLevels: path.join(REFERENCE, "competition-levels.json"),
  competitionStatuses: path.join(REFERENCE, "competition-statuses.json"),
  competitionEvents: path.join(ENTITIES, "competition-events.json"),
  competitionEventSessions: path.join(
    REFERENCE,
    "competition-event-sessions.json",
  ),
  competitionEditionOrganizations: path.join(
    RELATIONS,
    "competition-edition-organizations.json",
  ),
  competitionEditionOrganizationRoles: path.join(
    REFERENCE,
    "competition-edition-organization-roles.json",
  ),

  // Organizations
  organizations: path.join(ENTITIES, "organizations.json"),
  organizationTypes: path.join(REFERENCE, "organization-types.json"),
  organizationStatuses: path.join(REFERENCE, "organization-statuses.json"),

  // Geo
  venues: path.join(REFERENCE, "venues.json"),
  venueTypes: path.join(REFERENCE, "venue-types.json"),
  cities: path.join(REFERENCE, "cities.json"),
  countries: path.join(REFERENCE, "countries.json"),
  regions: path.join(REFERENCE, "regions.json"),

  // Media
  media: path.join(ENTITIES, "media.json"),
  mediaTypes: path.join(REFERENCE, "media-types.json"),
  mediaMimeTypes: path.join(REFERENCE, "media-mime-types.json"),
  mediaUsageTypes: path.join(REFERENCE, "media-usage-types.json"),
  entityMediaRelations: path.join(RELATIONS, "entity-media-relations.json"),

  // Gallery
  galleries: path.join(ENTITIES, "galleries.json"),
  galleryItems: path.join(RELATIONS, "gallery-items.json"),
  entityGalleryRelations: path.join(RELATIONS, "entity-gallery-relations.json"),

  // сюди можна додати будь-які нові файли БД.
};
