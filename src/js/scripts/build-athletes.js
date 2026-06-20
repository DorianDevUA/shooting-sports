// =======================================
// build-athletes.js
// Скрипт для генерації фінального athletes.json
// з усіх source файлів та першорівневих сутностей
// =======================================

import fs from "fs";
import path from "path";

import { readJSON } from "../utils/fs.js";
import { arrayToMap } from "../utils/array.js";
import { filterPersonsByRoleRels } from "../helpers/persons/filter-persons.js";
import {
  resolve,
  resolveCityDeep,
  resolveCountryDeep,
  resolveMainDiscipline,
  resolvePersonPortrait,
  resolveEventsForEntity,
  resolveClubsForEntity,
  resolvePesonRoles,
  resolveNationalCoachForAthlete,
  resolvePersonalCoachForAthlete,
  resolveTeamsForAthlete,
  resolveAgeCategory,
  resolvePrimaryClubForAthlete,
  resolveOtherClubsForAthlete,
  resolveAthleteProfile,
  resolveAthleteSportGrade,
  resolveAthleteOccupation,
  resolveAthleteEducation,
  resolveAthleteHobbies,
  resolveClubForAthlete,
} from "../services/data-resolver.js";
import { countryDTO, cityDTO } from "../mappers/geo.mapper.js";
import { roleDTO } from "../mappers/person.mapper.js";
import { portraitDTO } from "../mappers/image.mapper.js";
import { genderDTO } from "../mappers/gender.mapper.js";
import { eventDTO } from "../mappers/event.mapper.js";
import { clubDTO } from "../mappers/club.mapper.js";
import { coachDTO } from "../mappers/coach.mapper.js";
import { teamDTO } from "../mappers/team.mapper.js";
import { ageCategoryDTO } from "../mappers/competition.mapper.js";
import {
  athleteProfileDTO,
  dominantEyeDTO,
  handednessDTO,
  sportGradeDTO,
  maritalStatusDTO,
  athleteOccupationDTO,
  nationalityDTO,
  educationDTO,
  hobbyDTO,
} from "../mappers/athlete.mapper.js";
import { ENTITY_TYPES } from "../constants/entity-types.js";
import { PERSON_ROLES } from "../constants/person-roles.js";

// Папка з сирими даними
const SRC = "src/database/raw";
// Папка з довідниками (entities)
const ENTITIES = path.join(SRC, "entities");
const REFERENCE = path.join(SRC, "reference");
const RELATIONS = path.join(SRC, "relations");
// Папка для згенерованих файлів
const OUT = "src/database/generated";
const OUT_PUBLIC = "public/assets/data";

/**
 * Шлях до вхідного та вихідного файлу
 */
const paths = {
  athletes: path.join(ENTITIES, "persons.json"),
  output: path.join(OUT_PUBLIC, "athletes.json"),
};

/**
 *
 * Мапа усіх довідників.
 * Усі довідники, від яких залежать Athletes.
 * Сюди додаємо всі довідники, які будемо резолвити
 */
const dependencies = {
  // MEDIA
  media: path.join(ENTITIES, "media.json"),
  entityMediaRels: path.join(RELATIONS, "entity-media-relations.json"),

  // DISCIPLINES
  primaryDisciplines: path.join(
    RELATIONS,
    "athlete-primary-disciplines.temp.json",
  ),
  disciplines: path.join(ENTITIES, "disciplines.json"),
  distances: path.join(REFERENCE, "distances.json"),
  disciplineCategories: path.join(REFERENCE, "discipline-categories.json"),

  // TEAMS
  teams: path.join(ENTITIES, "teams.json"),
  teamTypes: path.join(REFERENCE, "team-types.json"),
  teamSections: path.join(REFERENCE, "team-sections.json"),
  squads: path.join(REFERENCE, "squads.json"),
  teamSelectionReasons: path.join(REFERENCE, "team-selection-reasons.json"),
  athleteTeamRels: path.join(RELATIONS, "athlete-team-relations.json"),

  // EVENTS
  events: path.join(ENTITIES, "events.json"),
  eventFormats: path.join(REFERENCE, "event-formats.json"),
  entityEventRels: path.join(RELATIONS, "entity-event-relations.json"),

  // REGION
  venues: path.join(REFERENCE, "venues.json"),
  cities: path.join(REFERENCE, "cities.json"),
  countries: path.join(REFERENCE, "countries.json"),
  regions: path.join(REFERENCE, "regions.json"),

  // CLUB
  organizations: path.join(ENTITIES, "organizations.json"),
  organizationTypes: path.join(REFERENCE, "organization-types.json"),
  organizationStatuses: path.join(REFERENCE, "organization-statuses.json"),
  athleteClubRels: path.join(RELATIONS, "athlete-club-relations.json"),

  // ROLES
  roles: path.join(REFERENCE, "roles.json"),
  personRoleRels: path.join(RELATIONS, "person-role-relations.json"),

  // COACHES
  persons: path.join(ENTITIES, "persons.json"),
  coachTypes: path.join(REFERENCE, "coach-types.json"),
  athleteCoachRels: path.join(RELATIONS, "athlete-coach-relations.json"),

  // ATHLETE
  athleteProfiles: path.join(ENTITIES, "athlete-profiles.json"),
  ageCategories: path.join(REFERENCE, "age-categories.json"),
  genders: path.join(REFERENCE, "genders.json"),
  handedness: path.join(REFERENCE, "handedness.json"),
  dominantEyes: path.join(REFERENCE, "dominant-eyes.json"),
  nationalities: path.join(REFERENCE, "nationalities.json"),

  // HOBBY
  hobbies: path.join(REFERENCE, "hobbies.json"),
  personHobbiesRels: path.join(RELATIONS, "person-hobbies.json"),

  // Marital status
  maritalStatuses: path.join(REFERENCE, "marital-statuses.json"),

  // Education and Occupation
  educationLevels: path.join(REFERENCE, "education-levels.json"),
  educationQualifications: path.join(
    REFERENCE,
    "education-qualifications.json",
  ),
  educationSpecializations: path.join(
    REFERENCE,
    "education-specializations.json",
  ),
  educationSpecializationCategories: path.join(
    REFERENCE,
    "education-specialization-categories.json",
  ),
  personEducationRels: path.join(RELATIONS, "person-educations.json"),
  occupations: path.join(REFERENCE, "occupations.json"),
  athleteOccupationRels: path.join(
    RELATIONS,
    "person-occupation-relations.json",
  ),

  // Sport Grade
  sportGrades: path.join(REFERENCE, "sport-grades.json"),
  athleteSportGrades: path.join(RELATIONS, "athlete-sport-grades.json"),
  // сюди можна додати будь-які нові файли
};

// Будуємо вихідний файл
function buildAthletes() {
  console.log("📄 Читаємо базові дані...");

  // 1️⃣ Завантажуємо всі довідники і робимо з них map
  /**
   * Мапа усіх довідників, від яких залежать Athletes.
   */
  const maps = {};

  for (const key in dependencies) {
    // Назва колекції(довідника) для деталізації тексту помилки
    const label = key[0].toUpperCase() + key.slice(1);

    maps[key] = arrayToMap(readJSON(dependencies[key]), label);
  }

  // 2️⃣ Парсимо базовий JSON файл і зберігаємо у змінну
  /**
   * Базовий вхідний масив з JSON файлу
   */
  const personsBase = readJSON(paths.athletes);

  // Парсимо массив зв'язків між сутностями та медиа-файлами.
  const athleteProfiles = readJSON(dependencies.athleteProfiles);
  const athleteSportGrades = readJSON(dependencies.athleteSportGrades);
  const ageCategories = readJSON(dependencies.ageCategories);
  const personRoleRels = readJSON(dependencies.personRoleRels);
  const athleteCoachRels = readJSON(dependencies.athleteCoachRels);
  const entityMediaRels = readJSON(dependencies.entityMediaRels);
  const entityEventRels = readJSON(dependencies.entityEventRels);
  const athleteClubRels = readJSON(dependencies.athleteClubRels);
  const athleteTeamRels = readJSON(dependencies.athleteTeamRels);
  const primaryDisciplines = readJSON(dependencies.primaryDisciplines);
  const athleteOccupationsRels = readJSON(dependencies.athleteOccupationRels);
  const personEducationRels = readJSON(dependencies.personEducationRels);
  const personHobbiesRels = readJSON(dependencies.personHobbiesRels);

  /**
   * 3️⃣ Валідація базових даних
   */
  for (const person of personsBase) {
    if (!person.id) {
      throw new Error("❌ Person without id");
    }

    if (!person.first_name) {
      throw new Error(`❌ Person "${person.id}" missing first_name`);
    }

    if (!person.last_name) {
      throw new Error(`❌ Person "${person.id}" missing last_name`);
    }

    if (!person.gender_id) {
      throw new Error(`❌ Person "${person.id}" missing gender_id`);
    }
  }

  /**
   * 4️⃣ Будуємо фінальний масив атлетів з резолвом залежностей
   */

  const filteredPersons = filterPersonsByRoleRels(
    personsBase,
    PERSON_ROLES.ATHLETE,
    personRoleRels,
  );

  const athletes = filteredPersons.map((person) => {
    const gender = resolve(maps.genders, person.gender_id, "Gender", person.id);
    const role = resolve(maps.roles, person.role_id, "Role", person.id);

    const roles = resolvePesonRoles({
      entityId: person.id,
      rolesMap: maps.roles,
      personRoleRels: personRoleRels,
    });

    let ageCategory = resolveAgeCategory({
      birthDate: person.date_of_birth,
      ageCategories,
    });

    ageCategory = resolve(
      maps.ageCategories,
      ageCategory,
      "Age Category",
      person.id,
    );

    const handedness = resolve(
      maps.handedness,
      person.handedness_id,
      "Handedness",
      person.id,
    );
    const dominantEye = resolve(
      maps.dominantEyes,
      person.dominant_eye_id,
      "Dominant eye",
      person.id,
    );

    const nationality = resolve(
      maps.nationalities,
      person.nationality_id,
      "Nationality",
      person.id,
    );
    const country = resolveCountryDeep(maps, person.country_id, person.id);
    const birthPlace = resolveCityDeep(maps, person.birth_place_id, person.id);
    const hometown = resolveCityDeep(maps, person.hometown_id, person.id);
    const residence = resolveCityDeep(maps, person.residence_id, person.id);
    const maritalStatus = resolve(
      maps.maritalStatuses,
      person.marital_status_id,
      "Marital status",
      person.id,
    );

    const athleteOccupation = resolveAthleteOccupation({
      athleteId: person.id,
      occupationsMap: maps.occupations,
      athleteOccupationsRels,
    });

    const mainDiscipline = resolveMainDiscipline({
      personId: person.id,
      payload: primaryDisciplines,
    });

    const sportGrade = resolveAthleteSportGrade({
      athleteId: person.id,
      sportGradesMap: maps.sportGrades,
      disciplineCategoriesMap: maps.disciplineCategories,
      athleteSportGrades,
    });

    const athleteProfile = resolveAthleteProfile({
      athleteId: person.id,
      dominantEyesMap: maps.dominantEyes,
      handednessMap: maps.handedness,
      athleteProfiles,
    });

    const education = resolveAthleteEducation({
      athleteId: person.id,
      educationLevelsMap: maps.educationLevels,
      educationQualificationsMap: maps.educationQualifications,
      educationSpecializationsMap: maps.educationSpecializations,
      educationSpecializationCategoriesMap:
        maps.educationSpecializationCategories,
      personEducationRels,
    });

    const portrait = resolvePersonPortrait({
      mediaMap: maps.media,
      personId: person.id,
      entityMedia: entityMediaRels,
    });

    const events = resolveEventsForEntity({
      entityId: person.id,
      entityTypeId: "person",
      gendersMap: maps.genders,
      distancesMap: maps.distances,
      disciplineCategoriesMap: maps.disciplineCategories,
      disciplinesMap: maps.disciplines,
      eventFormatsMap: maps.eventFormats,
      eventsMap: maps.events,
      eventRels: entityEventRels,
    });

    const athleteHobbies = resolveAthleteHobbies({
      athleteId: person.id,
      hobbiesMap: maps.hobbies,
      personHobbiesRels,
    });

    const personalCoach = resolvePersonalCoachForAthlete({
      athleteId: person.id,
      personsMap: maps.persons,
      coachTypesMap: maps.coachTypes,
      athleteCoachRels,
    });

    const nationalCoach = resolveNationalCoachForAthlete({
      athleteId: person.id,
      personsMap: maps.persons,
      coachTypesMap: maps.coachTypes,
      athleteCoachRels,
    });

    const otherClubs = resolveOtherClubsForAthlete({
      athleteId: person.id,
      organizationsMap: maps.organizations,
      organizationTypesMap: maps.organizationTypes,
      organizationStatusesMap: maps.organizationStatuses,
      venuesMap: maps.venues,
      citiesMap: maps.cities,
      countriesMap: maps.countries,
      regionsMap: maps.regions,
      athleteClubRels,
    });

    const primaryClub = resolveClubForAthlete({
      athleteId: person.id,
      organizationsMap: maps.organizations,
      organizationTypesMap: maps.organizationTypes,
      organizationStatusesMap: maps.organizationStatuses,
      venuesMap: maps.venues,
      citiesMap: maps.cities,
      countriesMap: maps.countries,
      regionsMap: maps.regions,
      athleteClubRels,
    });

    const teams = resolveTeamsForAthlete({
      athleteId: person.id,
      teamTypesMap: maps.teamTypes,
      squadsMap: maps.squads,
      teamsMap: maps.teams,
      ageCategoriesMap: maps.ageCategories,
      teamSelectionReasonsMap: maps.teamSelectionReasons,
      teamSectionsMap: maps.teamSections,
      disciplineCategoriesMap: maps.disciplineCategories,
      athleteTeamRels: athleteTeamRels,
    });

    // console.log("teams", teams.map(teamDTO));

    if (!person.code) {
      throw new Error(`Person without code! id: ${person.id}`);
    }

    // Структура фінального об'єкта
    return {
      // Базові поля
      id: person.id,
      slug: person.slug,
      code:
        person.code ??
        `${person.last_name.toLowerCase()}_${person.first_name.toLowerCase()}`,
      first_name: person.first_name,
      last_name: person.last_name,
      full_name: `${person.last_name} ${person.first_name}`,
      date_of_birth: person.date_of_birth,
      age_category: ageCategoryDTO(ageCategory),

      // Resolved fields
      athlete_profile: athleteProfile
        ? {
            ...athleteProfileDTO(athleteProfile),
          }
        : null,
      coaches: {
        personal: coachDTO(personalCoach),
        national: coachDTO(nationalCoach),
      },
      roles: roles.map(roleDTO),
      gender: genderDTO(gender),

      country: countryDTO(country),
      nationality: nationalityDTO(nationality),
      birth_place: cityDTO(birthPlace),
      hometown: cityDTO(hometown),
      residence: cityDTO(residence),
      marital_status: maritalStatusDTO(maritalStatus),
      education: educationDTO(education),
      occupation: athleteOccupationDTO(athleteOccupation),
      events: events.map(eventDTO),
      primary_club: clubDTO(primaryClub),
      other_clubs: otherClubs.map(clubDTO),
      teams: teams.map(teamDTO),
      hobbies: athleteHobbies.map(hobbyDTO),

      main_discipline: mainDiscipline,
      sport_grade: sportGradeDTO(sportGrade),

      images: {
        portrait: portraitDTO(portrait),
      },
    };
  });

  /**
   * 5️⃣ Захищаємо від випадкових мутацій.
   */
  Object.freeze(athletes);

  /**
   * 6️⃣ Гарантуємо, що папка generated існує.
   * Створюємо папку, якщо її ще немає
   */
  fs.mkdirSync(OUT, { recursive: true });

  // 7️⃣ Записуємо фінальний файл
  fs.writeFileSync(paths.output, JSON.stringify(athletes, null, 2), "utf-8");

  console.log(`✅ Generated: ${athletes.length} Athletes`);
  console.log(`✅ Saved to: ${paths.output}`);
}

// Запускаємо script
try {
  buildAthletes();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
