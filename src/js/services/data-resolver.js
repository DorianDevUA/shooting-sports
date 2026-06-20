import { ENTITY_TYPES } from "../constants/entity-types.js";
import { buildVenue } from "../mappers/geo.mapper.js";
import { getFromMap } from "../utils/array.js";
import { calculateAge } from "../utils/date.js";

/**
 * Резолвит сущность из мапы по её ID.
 *
 * @param {Record<string, any>} map - Объект-справочник, где ключи — это ID.
 * @param {string|number|null|undefined} id - Идентификатор сущности, которую ищем.
 * @param {string} entityName - Название типа сущности (используется для сообщения об ошибке).
 * @param {string|number} parentId - ID родителя или контекст, в котором произошла ошибка.
 * @returns {any|null} Найденная сущность или null, если id не передан.
 * @throws {Error} Выбрасывает ошибку, если id передан, но сущность в мапе отсутствует.
 */
function resolve(map, id, entityName, parentId) {
  // Деякі поля можуть бути опціональні
  if (!id) {
    return null;
  }

  const entity = map[id];

  if (!entity) {
    throw new Error(
      `❌ ${entityName} with id: "${id}" not found (parent: ${parentId})`,
    );
  }

  return entity;
}

/**
 * Резолвит полные данные города, включая вложенную страну и регион.
 *
 * @param {Object} maps - Объект со справочниками (cities, countries, regions).
 * @param {string|number} cityId - ID города, который нужно найти.
 * @param {string|number} parentId - ID родительской сущности (для логирования ошибок).
 * @returns {Object|null} Объект города с глубокими зависимостями или null, если cityId не передан.
 * @throws {Error} Если город, страна или регион не найдены в мапах.
 */
function resolveCityDeep(maps, cityId, parentId) {
  if (!cityId) {
    return null;
  }

  const city = resolve(maps.cities, cityId, "City", parentId);
  const country = resolve(maps.countries, city.country_id, "Country", parentId);
  const region = resolve(maps.regions, country.region_id, "Region", parentId);

  return {
    ...city,
    country: {
      ...country,
      region,
    },
  };
}

/**
 * Резолвит полные данные страны, включая вложенный регион.
 *
 * @param {Object} maps - Объект со справочниками (countries, regions).
 * @param {string|number} countryId - ID страны, которую нужно найти.
 * @param {string|number} parentId - ID родительской сущности (для логирования ошибок).
 * @returns {Object|null} Объект страны с привязанным регионом или null, если countryId не передан.
 * @throws {Error} Если страна или регион не найдены в мапах.
 */
function resolveCountryDeep(maps, countryId, parentId) {
  if (!countryId) {
    return null;
  }

  const country = resolve(maps.countries, countryId, "Country", parentId);
  const region = resolve(maps.regions, country.region_id, "Region", parentId);

  return {
    ...country,
    region,
  };
}

function resolveCoachForAthlete({
  athleteId,
  coachTypeId,
  personsMap,
  coachTypesMap,
  athleteCoachRels,
}) {
  // 1️⃣ Шукаємо relation
  const relation = athleteCoachRels.find(
    (item) =>
      item.athlete_id === athleteId &&
      item.coach_type_id === coachTypeId &&
      item.is_primary &&
      item.is_active,
  );

  // Якщо немає тренера → null
  if (!relation) {
    return null;
  }

  // 2️⃣ Отримуємо coach
  const coach = getFromMap(personsMap, relation.coach_id, "Coach", relation.id);

  // 3️⃣ Отримуємо тип тренера
  const coachType = getFromMap(
    coachTypesMap,
    relation.coach_type_id,
    "Coach type",
    relation.id,
  );

  // 4️⃣ Повертаємо фінальний object
  return {
    id: relation.id,
    type: coachType,
    person: coach,
    is_primary: relation.is_primary,
    started_at: relation.started_at,
    ended_at: relation.ended_at,
    notes: relation.notes ?? null,
  };
}

function resolvePersonalCoachForAthlete(params) {
  return resolveCoachForAthlete({
    ...params,
    coachTypeId: "personal",
  });
}

function resolveNationalCoachForAthlete(params) {
  return resolveCoachForAthlete({
    ...params,
    coachTypeId: "national",
  });
}

function resolvePesonRoles({ entityId, rolesMap, personRoleRels }) {
  if (!entityId) {
    console.log("Warning! fnc => resolvePersonRoles");
    console.log("entityId: false, => return []");
    return [];
  }

  const filteredRels = personRoleRels.filter(
    (rel) => rel.person_id === entityId,
  );

  if (!filteredRels.length) {
    console.log(`🚩 fnc => resolvePersonRoles`);
    console.log(`❌ Warning! Person id:${entityId} without personRoleRels!`);
    console.log("filteredRels.length: false, => return []");
    return [];
  }

  return filteredRels.map((rel) => {
    const role = getFromMap(rolesMap, rel.role_id, "Role", rel.id);

    return {
      ...role,
    };
  });
}

/**
 * Находит URL портрета человека на основе связей медиа-файлов.
 *
 * @param {Object} params - Объект параметров функции.
 * @param {Record<string|number, Object>} params.mediaMap - Мапа всех медиа-файлов (результат ф-ции arrayToMap).
 * @param {string|number} params.personId - ID человека, для которого ищется портрет.
 * @param {Array<Object>} params.entityMedia - Массив связей между сущностями и медиа.
 *
 * @returns {string|null} `URL` изображения или `null`, если портрет не найден или связь отсутствует.
 *
 * @example
 * const portraitUrl = resolvePersonPortrait({
 *   personId: 'ath_0001',
 *   mediaMap: { media_0001: { id: 'media_0001', url: 'https://cdn.com', type_id: 'image' } },
 *   entityMedia: [{ id: 'ety_media_0001', entity_id: 'ath_0001', entity_type: 'person', media_id: 'media_0001', usage_type_id: 'portrait', is_active: true }]
 * });
 */
function resolvePersonPortrait({ mediaMap, personId, entityMedia }) {
  const relation = entityMedia.find(
    (item) =>
      item.entity_id === personId &&
      item.entity_type === "person" &&
      item.usage_type_id === "portrait" &&
      item.is_primary &&
      item.is_active,
  );

  if (!relation) {
    return null;
  }

  // const media = mediaMap[relation.media_id];
  const media = getFromMap(mediaMap, relation.media_id, "Media", relation.id);

  return {
    ...media,
    alt: relation?.alt ?? null,
    title: relation?.title ?? null,
  };
}

/**
 * Находит основную дисциплину спортсмена на основе данных из payload.
 *
 * @param {Object} options - Параметры функции.
 * @param {number|string} options.personId - Уникальный идентификатор спортсмена.
 * @param {Array<Object>} options.payload - Массив объектов со связями атлетов и дисциплин.
 *
 * @returns {string|null} Название дисциплины или null, если связь не найдена.
 */
function resolveMainDiscipline({ personId, payload }) {
  const relation = payload.find((rel) => rel.athlete_id === personId);
  return relation ? relation.discipline : null;
}

/**
 * Знаходить та формує дані обкладинки для конкретної статті.
 *
 * @param {Object} params - Параметри функції.
 * @param {Object.<string, Object>} params.mediaMap - Словник медіа-файлів, де ключ — ID медіа.
 * @param {number|string} params.articleId - Унікальний ідентифікатор статті.
 * @param {Array<Object>} params.entityMedia - Список зв'язків між сутностями та медіа.
 *
 * @returns {Object|null} Об'єкт медіа з доданими alt та title, або null, якщо обкладинка не знайдена.
 */
function resolveArticleCover({ mediaMap, articleId, entityMedia }) {
  const relation = entityMedia.find(
    (item) =>
      item.entity_id === articleId &&
      item.entity_type === "article" &&
      item.usage_type_id === "cover" &&
      item.is_primary &&
      item.is_active,
  );

  if (!relation) {
    return null;
  }

  // const media = mediaMap[relation.media_id];
  const media = getFromMap(mediaMap, relation.media_id, "Media", relation.id);

  media.alt = relation?.alt ?? "";
  media.title = relation?.title ?? "";

  return media;
}

function resolveImage() {}

function resolveCoverForCompetition(params) {
  return resolveImage({ ...params, entity_type: "" });
}

// function resolvePersonalCoachForAthlete(params) {
//   return resolveCoachForAthlete({
//     ...params,
//     coachTypeId: "personal",
//   });
// }

/**
 * Глибокий резолв тегів з приєднанням даних про їхні групи.
 *
 * @param {Object} params - Параметри функції.
 * @param {string|number} params.entityId - ID сутності (статті, продукту тощо).
 * @param {string|number} params.entityTypeId - Тип сутності (entity-types.json).
 * @param {Object.<string, Object>} params.tagMap - об'єкт-карта(Map) тегів, де ключ — `id` тега.
 * @param {Object.<string, Object>} params.tagGroupMap - об'єкт-карта(Map) груп тегів, де ключ — `id` групи.
 * @param {Array<Object>} params.tagRelations - Масив зв'язків між сутностями та тегами.
 *
 * @returns {Array<Object>|null} Масив об'єктів тегів із вкладеним об'єктом group або null, якщо entityId відсутній.
 *
 * @throws {Error} Якщо тег із масиву зв'язків не знайдено в tagMap.
 * @throws {Error} Якщо група тега не знайдена в tagGroupMap.
 */
function resolveTagsForEntity({
  entityId,
  entityTypeId,
  tagMap,
  tagGroupMap,
  tagRelations,
}) {
  if (!entityId) {
    return [];
  }

  // 1. Знаходимо усі зв'язки
  const filteredRels = tagRelations.filter(
    (rel) =>
      rel.entity_id === entityId &&
      rel.entity_type_id === entityTypeId &&
      rel.is_active,
  );

  if (!filteredRels.length) {
    return [];
  }

  // 2. Cортуємо отриманий масив тегів
  filteredRels.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return filteredRels.map((rel) => {
    const tag = getFromMap(tagMap, rel.tag_id, "Tag", rel.id);
    const group = getFromMap(tagGroupMap, tag.group_id, "Tag group", tag.id);

    return {
      ...tag,
      group: { ...group },
    };
  });
}

function resolveAthleteSportGrade({
  athleteId,
  sportGradesMap,
  disciplineCategoriesMap,
  athleteSportGrades,
}) {
  const relation = athleteSportGrades.find(
    (rel) => rel.person_id === athleteId && !rel.revoked_at && rel.is_active,
  );

  if (!relation) {
    return null;
  }

  const sportGrade = getFromMap(
    sportGradesMap,
    relation.sport_grade_id,
    "Sport Grade",
    relation.id,
  );

  const disciplineCategory = getFromMap(
    disciplineCategoriesMap,
    relation.discipline_category_id,
    "Discipline Category",
    relation.id,
  );

  return {
    ...sportGrade,
    discipline_category: {
      ...disciplineCategory,
    },
    certificate_number: relation.certificate_number ?? null,
    awarded_at: relation.awarded_at,
    notes: relation.notes ?? null,
  };
}

function resolveAthleteOccupation({
  athleteId,
  occupationsMap,
  athleteOccupationsRels,
}) {
  const relation = athleteOccupationsRels.find(
    (rel) =>
      rel.person_id === athleteId &&
      !rel.ended_at &&
      rel.is_primary &&
      rel.is_active,
  );

  if (!relation) {
    return null;
  }

  const occupation = getFromMap(
    occupationsMap,
    relation.occupation_id,
    "Occupation",
    relation.id,
  );

  return {
    ...occupation,
    started_at: relation.started_at,
    ended_at: relation.ended_at,
    is_primary: relation.is_primary,
  };
}

function resolveAthleteEducation({
  athleteId,
  educationLevelsMap,
  educationQualificationsMap,
  educationSpecializationsMap,
  educationSpecializationCategoriesMap,
  personEducationRels,
}) {
  const relation = personEducationRels.find(
    (rel) => rel.person_id === athleteId && rel.is_current && rel.is_active,
  );

  if (!relation) {
    return null;
  }

  const educationLevel = getFromMap(
    educationLevelsMap,
    relation.education_level_id,
    "Education Level",
    relation.id,
  );

  const educationQualification = getFromMap(
    educationQualificationsMap,
    relation.education_qualification_id,
    "Education Qualification",
    relation.id,
  );

  const educationSpecialization = getFromMap(
    educationSpecializationsMap,
    relation.education_specialization_id,
    "Education Specialization",
    relation.id,
  );

  const educationSpecializationCategory = getFromMap(
    educationSpecializationCategoriesMap,
    educationSpecialization?.category_id,
    "Education Specialization Category",
    educationSpecialization?.id,
  );

  return {
    institution_name: relation.institution_name,
    level: {
      ...educationLevel,
    },
    qualification: educationQualification
      ? {
          ...educationQualification,
        }
      : null,
    specialization: educationSpecialization
      ? {
          ...educationSpecialization,
          category: {
            ...educationSpecializationCategory,
          },
        }
      : null,
    started_at: relation.started_at,
    graduated_at: relation.graduated_at,
    notes: relation.notes,
  };
}

function resolveAthleteProfile({
  athleteId,
  dominantEyesMap,
  handednessMap,
  athleteProfiles,
}) {
  const athleteProfile = athleteProfiles.find(
    (athlete) => athlete.id === athleteId,
  );

  if (!athleteProfile) {
    // console.log(`Athlete Profile - not found! Athlet ID:${athleteId}`);
    return null;
  }

  const handedness = getFromMap(
    handednessMap,
    athleteProfile.handedness_type_id,
    "Handedness",
    athleteId,
  );

  const dominantEye = getFromMap(
    dominantEyesMap,
    athleteProfile.dominant_eye_id,
    "Dominant Eye",
    athleteId,
  );

  return {
    ...athleteProfile,
    handedness: handedness
      ? {
          ...handedness,
        }
      : null,
    dominant_eye: dominantEye
      ? {
          ...dominantEye,
        }
      : null,
  };
}

function resolveAthleteHobbies({ athleteId, hobbiesMap, personHobbiesRels }) {
  const relations = personHobbiesRels.filter(
    (rel) => rel.person_id === athleteId && rel.is_active,
  );

  if (!relations.length) {
    return [];
  }

  return relations.map((rel) => {
    const hobby = getFromMap(hobbiesMap, rel.hobby_id, "Hobby", rel.id);

    return {
      ...hobby,
      sort_order: rel.sort_order,
    };
  });
}

function resolveEventsForEntity({
  entityId,
  entityTypeId,
  gendersMap,
  distancesMap,
  disciplineCategoriesMap,
  disciplinesMap,
  eventFormatsMap,
  eventsMap,
  eventRels,
}) {
  if (!entityId) {
    return [];
  }

  // 1. Знаходимо усі зв'язки
  const filteredRels = eventRels.filter(
    (rel) =>
      rel.entity_id === entityId &&
      rel.entity_type_id === entityTypeId &&
      rel.is_active,
  );

  if (!filteredRels.length) {
    return [];
  }

  return filteredRels.map((rel) => {
    const event = getFromMap(eventsMap, rel.event_id, "Event", rel.id);
    const gender = getFromMap(gendersMap, event.gender_id, "Gender", event.id);
    const eventFormat = getFromMap(
      eventFormatsMap,
      event.format_id,
      "Event format",
      event.id,
    );
    const discipline = getFromMap(
      disciplinesMap,
      event.discipline_id,
      "Event discipline",
      event.id,
    );
    const distance = getFromMap(
      distancesMap,
      discipline.distance_id,
      "Distance",
      discipline.id,
    );
    const disciplineCategory = getFromMap(
      disciplineCategoriesMap,
      discipline.category_id,
      "Discipline category",
      discipline.id,
    );

    return {
      ...event,
      gender: { ...gender },
      format: { ...eventFormat },
      discipline: {
        ...discipline,
        distance: {
          ...distance,
        },
        category: {
          ...disciplineCategory,
        },
      },
    };
  });
}

function resolveClubsForEntity({
  entityId,
  entityTypeId,
  clubTypesMap,
  clubStatusesMap,
  clubsMap,
  regionsMap,
  countriesMap,
  citiesMap,
  athleteClubRels,
}) {
  if (!entityId) {
    return [];
  }

  // 1. Знаходимо усі зв'язки
  const filteredRels = athleteClubRels.filter(
    (rel) =>
      rel.entity_id === entityId &&
      rel.entity_type_id === entityTypeId &&
      rel.is_active,
  );

  if (!filteredRels.length) {
    return [];
  }

  return filteredRels.map((rel) => {
    const club = getFromMap(clubsMap, rel.club_id, "Club", rel.id);
    const type = getFromMap(
      clubTypesMap,
      club.club_type_id,
      "Club type",
      club.id,
    );
    const status = getFromMap(
      clubStatusesMap,
      club.club_status_id,
      "Club status",
      club.id,
    );

    const country = getFromMap(
      countriesMap,
      club.country_id,
      "Country",
      club.id,
    );

    const region = getFromMap(
      regionsMap,
      country.region_id,
      "Region",
      country.id,
    );

    const city = getFromMap(citiesMap, club.city_id, "City", club.id);
    const cityCountry = getFromMap(
      countriesMap,
      city.country_id,
      "Country",
      city.id,
    );
    const cityRegion = getFromMap(
      regionsMap,
      cityCountry.region_id,
      "Region",
      cityCountry.id,
    );

    return {
      ...club,
      type: {
        ...type,
      },
      status: {
        ...status,
      },
      country: {
        ...country,
        region: {
          ...region,
        },
      },
      city: {
        ...city,
        country: {
          ...cityCountry,
          region: {
            ...cityRegion,
          },
        },
      },
    };
  });
}

function resolveOtherClubsForAthlete({
  athleteId,
  organizationsMap,
  organizationTypesMap,
  organizationStatusesMap,
  venuesMap,
  citiesMap,
  countriesMap,
  regionsMap,
  athleteClubRels,
}) {
  if (!athleteId) {
    return [];
  }

  // 1. Знаходимо усі зв'язки
  const filteredRels = athleteClubRels.filter(
    (rel) =>
      rel.entity_id === athleteId &&
      rel.entity_type_id === ENTITY_TYPES.PERSON &&
      !rel.is_primary &&
      !rel.left_at &&
      rel.is_active,
  );

  if (!filteredRels.length) {
    return [];
  }

  return filteredRels.map((rel) => {
    const organization = getFromMap(
      organizationsMap,
      rel.club_id,
      "Organization",
      rel.id,
    );
    const type = getFromMap(
      organizationTypesMap,
      organization.organization_type_id,
      "Organization Type",
      organization.id,
    );
    const status = getFromMap(
      organizationStatusesMap,
      organization.organization_status_id,
      "Organization Status",
      organization.id,
    );

    const venue = getFromMap(
      venuesMap,
      organization.venue_id,
      "Venue",
      organization.id,
    );
    const venueCity = getFromMap(citiesMap, venue?.city_id, "City", venue?.id);
    const venueCountry = getFromMap(
      countriesMap,
      venueCity?.country_id,
      "Country",
      venueCity?.id,
    );
    const venueRegion = getFromMap(
      regionsMap,
      venueCountry?.region_id,
      "Region",
      venueCountry?.id,
    );

    const city = getFromMap(
      citiesMap,
      organization.city_id,
      "City",
      organization.id,
    );
    const cityCountry = getFromMap(
      countriesMap,
      city.country_id,
      "Country",
      city.id,
    );
    const cityRegion = getFromMap(
      regionsMap,
      cityCountry.region_id,
      "Region",
      cityCountry.id,
    );

    const country = getFromMap(
      countriesMap,
      organization.country_id,
      "Country",
      organization.id,
    );
    const region = getFromMap(
      regionsMap,
      country.region_id,
      "Region",
      country.id,
    );

    return {
      ...organization,
      type: {
        ...type,
      },
      status: {
        ...status,
      },

      venue: buildVenue({
        venue,
        city: venueCity,
        country: venueCountry,
        region: venueRegion,
      }),

      city: {
        ...city,
        country: {
          ...cityCountry,
          region: {
            ...cityRegion,
          },
        },
      },

      country: {
        ...country,
        region: {
          ...region,
        },
      },
    };
  });
}

function resolveClubForAthlete({
  athleteId,
  organizationsMap,
  organizationTypesMap,
  organizationStatusesMap,
  venuesMap,
  citiesMap,
  countriesMap,
  regionsMap,
  athleteClubRels,
}) {
  if (!athleteId) {
    return null;
  }

  // 1. Знаходимо зв'язки
  const relation = athleteClubRels.find(
    (rel) =>
      rel.entity_id === athleteId &&
      rel.entity_type_id === ENTITY_TYPES.PERSON &&
      rel.is_primary &&
      !rel.left_at &&
      rel.is_active,
  );

  if (!relation) {
    return null;
  }

  // console.log("relation", relation);

  const organization = getFromMap(
    organizationsMap,
    relation.club_id,
    "Organization",
    relation.id,
  );

  // console.log("organization", organization);

  const type = getFromMap(
    organizationTypesMap,
    organization.organization_type_id,
    "Organization Type",
    organization.id,
  );
  const status = getFromMap(
    organizationStatusesMap,
    organization.organization_status_id,
    "Organization Status",
    organization.id,
  );

  const country = getFromMap(
    countriesMap,
    organization.country_id,
    "Country",
    organization.id,
  );
  const region = getFromMap(
    regionsMap,
    country.region_id,
    "Region",
    country.id,
  );

  const city = getFromMap(
    citiesMap,
    organization.city_id,
    "City",
    organization.id,
  );
  const cityCountry = getFromMap(
    countriesMap,
    city.country_id,
    "Country",
    city.id,
  );
  const cityRegion = getFromMap(
    regionsMap,
    cityCountry.region_id,
    "Region",
    cityCountry.id,
  );

  const venue = getFromMap(
    venuesMap,
    organization.venue_id,
    "Venue",
    organization.id,
  );

  const venueCity = getFromMap(
    citiesMap,
    venue?.city_id,
    "Venue City",
    venue?.id,
  );

  const venueCountry = getFromMap(
    countriesMap,
    venueCity?.country_id,
    "Venue -> City -> Country",
    venueCity?.id,
  );

  const venueRegion = getFromMap(
    regionsMap,
    venueCountry?.region_id,
    "Venue -> City -> Country -> Region",
    venueCountry?.id,
  );

  return {
    ...organization,
    type: {
      ...type,
    },
    status: {
      ...status,
    },
    venue: buildVenue({
      venue,
      city: venueCity,
      country: venueCountry,
      region: venueRegion,
    }),
    city: {
      ...city,
      country: {
        ...cityCountry,
        region: {
          ...cityRegion,
        },
      },
    },
    country: {
      ...country,
      region: {
        ...region,
      },
    },
  };
}

function resolvePrimaryClubForAthlete({
  entityId,
  entityTypeId,
  clubTypesMap,
  clubStatusesMap,
  clubsMap,
  regionsMap,
  countriesMap,
  citiesMap,
  athleteClubRels,
}) {
  if (!entityId) {
    return null;
  }

  // 1. Знаходимо усі зв'язки
  const relation = athleteClubRels.find(
    (rel) =>
      rel.entity_id === entityId &&
      rel.entity_type_id === "person" &&
      rel.is_primary &&
      !rel.left_at &&
      rel.is_active,
  );

  if (!relation) {
    return null;
  }

  const club = getFromMap(clubsMap, relation.club_id, "Club", relation.id);
  const type = getFromMap(
    clubTypesMap,
    club.club_type_id,
    "Club type",
    club.id,
  );
  const status = getFromMap(
    clubStatusesMap,
    club.club_status_id,
    "Club status",
    club.id,
  );

  const country = getFromMap(countriesMap, club.country_id, "Country", club.id);
  const region = getFromMap(
    regionsMap,
    country.region_id,
    "Region",
    country.id,
  );
  const city = getFromMap(citiesMap, club.city_id, "City", club.id);
  const cityCountry = getFromMap(
    countriesMap,
    city.country_id,
    "Country",
    city.id,
  );
  const cityRegion = getFromMap(
    regionsMap,
    cityCountry.region_id,
    "Region",
    cityCountry.id,
  );

  return {
    ...club,
    type: {
      ...type,
    },
    status: {
      ...status,
    },
    country: {
      ...country,
      region: {
        ...region,
      },
    },
    city: {
      ...city,
      country: {
        ...cityCountry,
        region: {
          ...cityRegion,
        },
      },
    },
  };
}

function resolveTeamsForAthlete({
  athleteId,
  teamTypesMap,
  squadsMap,
  teamsMap,
  ageCategoriesMap,
  teamSelectionReasonsMap,
  teamSectionsMap,
  disciplineCategoriesMap,
  athleteTeamRels,
}) {
  const filteredRels = athleteTeamRels.filter(
    (rel) => rel.athlete_id === athleteId,
  );

  if (!filteredRels.length) {
    return [];
  }

  return filteredRels.map((rel) => {
    const team = getFromMap(teamsMap, rel.team_id, "Team", rel.id);
    const teamType = getFromMap(
      teamTypesMap,
      team.team_type_id,
      "Team Type",
      team.id,
    );
    const teamAgeCategory = getFromMap(
      ageCategoriesMap,
      team.age_category_id,
      "Age Category",
      team.id,
    );

    const squad = getFromMap(squadsMap, rel.squad_id, "Squad", rel.id);
    const selectionReason = getFromMap(
      teamSelectionReasonsMap,
      rel.selection_reason_id,
      "Selection Reason",
      rel.id,
    );

    const teamSection = getFromMap(
      teamSectionsMap,
      rel.team_section_id,
      "Team Section",
      rel.id,
    );

    const disciplineCategory = getFromMap(
      disciplineCategoriesMap,
      teamSection.discipline_category_id,
      "Discipline Category",
      teamSection.id,
    );

    // console.log("disciplineCategory", disciplineCategory);

    return {
      ...team,
      team_type: {
        ...teamType,
      },
      age_category: {
        ...teamAgeCategory,
      },
      team_section: {
        ...teamSection,
        discipline_category: {
          ...disciplineCategory,
        },
      },
      squad: {
        ...squad,
      },
      selection_reason: {
        ...selectionReason,
      },
      selection_date: rel.selection_date,
      joined_at: rel.joined_at,
      left_at: rel.left_at,
    };
  });
}

function resolveAgeCategory({ birthDate, ageCategories }) {
  const athleteAge = calculateAge(birthDate);

  return (
    ageCategories.find(({ min_age, max_age }) => {
      const meetsMinAge = athleteAge >= min_age;

      const meetsMaxAge = max_age === null || athleteAge <= max_age;

      return meetsMinAge && meetsMaxAge;
    })?.id || null
  );
}

export {
  resolve,
  resolveCityDeep,
  resolveCountryDeep,
  resolvePersonPortrait,
  resolveMainDiscipline,
  resolveArticleCover,
  resolvePesonRoles,
  resolveTagsForEntity,
  resolveEventsForEntity,
  resolveClubsForEntity,
  resolveClubForAthlete,
  resolvePrimaryClubForAthlete,
  resolveOtherClubsForAthlete,
  resolvePersonalCoachForAthlete,
  resolveNationalCoachForAthlete,
  resolveTeamsForAthlete,
  resolveAgeCategory,
  resolveAthleteProfile,
  resolveAthleteSportGrade,
  resolveAthleteOccupation,
  resolveAthleteEducation,
  resolveAthleteHobbies,
};
