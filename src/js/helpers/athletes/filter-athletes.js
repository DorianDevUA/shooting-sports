import { normalizeString } from "../../utils/string.js";

function getAthleteFullName({ first_name, last_name }) {
  return normalizeString(`${last_name} ${first_name}`);
}

function filterAthletesByFullName(items, query) {
  const normalizedQuery = normalizeString(query);

  if (!normalizedQuery) {
    return [];
  }

  return items.filter((athlete) => {
    const fullName = getAthleteFullName(athlete);

    return fullName.includes(normalizedQuery);
  });
}

function filterAthletesByDiscipline(items, discipline) {
  return items.filter((athlete) => athlete.main_discipline?.id === discipline);
}

function filterAthletesByDisciplines(athletes, disciplines) {
  return athletes.filter((athlete) =>
    disciplines.includes(athlete.main_discipline?.id),
  );
}

function filterAthletesByGender(items, gender) {
  return items.filter((athlete) => athlete.gender.id === gender);
}

function filterAthletesByGenders(athletes, genders) {
  return athletes.filter((athlete) => genders.includes(athlete.gender.id));
}

function filterAthletesByAgeCategory(items, ageCategory) {
  return items.filter((athlete) => athlete.age_category?.id === ageCategory);
}

function filterAthletesByAgeCategories(athletes, ageCategories) {
  return athletes.filter((athlete) =>
    ageCategories.includes(athlete.age_category?.id),
  );
}

function filterAthletesByPrimaryClub(items, club) {
  return items.filter((athlete) => athlete.primary_club?.id === club);
}

function filterAthletesByPrimaryClubs(athletes, clubs) {
  return athletes.filter((athlete) => clubs.includes(athlete.primary_club?.id));
}

function filterAthletesBySportsGrade(items, sportsGrade) {
  return items.filter((athlete) => athlete.sport_grade?.id === sportsGrade);
}

function filterAthletesBySportsGrades(athletes, sportsGrades) {
  return athletes.filter((athlete) =>
    sportsGrades.includes(athlete.sport_grade?.id),
  );
}

export {
  getAthleteFullName,
  filterAthletesByFullName,
  filterAthletesByDiscipline,
  filterAthletesByDisciplines,
  filterAthletesByGender,
  filterAthletesByGenders,
  filterAthletesByAgeCategory,
  filterAthletesByAgeCategories,
  filterAthletesByPrimaryClub,
  filterAthletesByPrimaryClubs,
  filterAthletesBySportsGrade,
  filterAthletesBySportsGrades,
};
