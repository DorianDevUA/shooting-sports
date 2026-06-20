import { DATABASE_FILES } from "./database-files.js";

const BUILD_DEPENDENCIES = {
  competitions: {
    competitions: DATABASE_FILES.competitions,
    competitionEditions: DATABASE_FILES.competitionEditions,
    competitionLevels: DATABASE_FILES.competitionLevels,
    competitionCategories: DATABASE_FILES.competitionCategories,
    competitionEditionOrganizations:
      DATABASE_FILES.competitionEditionOrganizations,
    competitionEditionOrganizationRoles:
      DATABASE_FILES.competitionEditionOrganizationRoles,
    competitionEvents: DATABASE_FILES.competitionEvents,
    ageCategories: DATABASE_FILES.ageCategories,
    events: DATABASE_FILES.events,
    eventFormats: DATABASE_FILES.eventFormats,
    genders: DATABASE_FILES.genders,

    // Discipline
    disciplines: DATABASE_FILES.disciplines,
    disciplineCategories: DATABASE_FILES.disciplineCategories,
    distances: DATABASE_FILES.distances,

    // Media
    media: DATABASE_FILES.media,
    mediaTypes: DATABASE_FILES.mediaTypes,
    mediaMimeTypes: DATABASE_FILES.mediaMimeTypes,
    mediaUsageTypes: DATABASE_FILES.mediaUsageTypes,
    entityMediaRelations: DATABASE_FILES.entityMediaRelations,

    // Organizations
    organizations: DATABASE_FILES.organizations,
    organizationTypes: DATABASE_FILES.organizationTypes,
    organizationStatuses: DATABASE_FILES.organizationStatuses,

    // Geo
    venues: DATABASE_FILES.venues,
    venueTypes: DATABASE_FILES.venueTypes,
    cities: DATABASE_FILES.cities,
    countries: DATABASE_FILES.countries,
    regions: DATABASE_FILES.regions,

    // Gallery
    galleries: DATABASE_FILES.galleries,
    galleryItems: DATABASE_FILES.galleryItems,
    entityGalleryRelations: DATABASE_FILES.entityGalleryRelations,
  },

  athletes: {
    athletes: DATABASE_FILES.athletes,
    clubs: DATABASE_FILES.organizations,
  },

  news: {
    news: DATABASE_FILES.news,
    media: DATABASE_FILES.media,
  },
};

export { BUILD_DEPENDENCIES };
