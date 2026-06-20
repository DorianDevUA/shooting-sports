import { CLASS_STATES } from "../../constants/ui.js";
import { debounce } from "../../utils/debounce.js";
import { normalizeString } from "../../utils/string.js";
import { updateSearchParams } from "../url/search-params.js";
import {
  renderFilterResults,
  resetFilterResults,
  showNoFilterResultsMessage,
} from "./athletes-results.js";
import {
  filterAthletesByDisciplines,
  filterAthletesByGenders,
  filterAthletesByAgeCategories,
  filterAthletesByPrimaryClubs,
  filterAthletesByFullName,
  filterAthletesBySportsGrades,
} from "./filter-athletes.js";

import { getAthletesFiltersFromUrl } from "./get-athletes-filters-from-url.js";

const refs = {
  searchInput: document.querySelector(".js-athlete-search"),
  filterGroups: document.querySelector(".page-filters__groups"),
};

const filtersState = {
  search: "",

  gender: [],
  age_category: [],
  discipline: [],
  primary_club: [],
  sports_grade: [],
};

const FILTER_PARAMS = {
  gender: "gender",
  ageCategory: "age_category",
  discipline: "discipline",
  primaryClub: "primary_club",
  sportsGrade: "sports_grade",
};

let athletesList = [];

function initAthletesFiltersMultiselect(athletes) {
  athletesList = athletes;

  restoreFiltersStateFromUrl();
  updateFiltersUI();
  applyFilters();

  bindEvents();
}

function bindEvents() {
  const debouncedSearch = debounce(handleInputSearch, 600);

  refs.searchInput?.addEventListener("input", debouncedSearch);
  refs.filterGroups?.addEventListener("click", handleFiltersClick);
}

function handleInputSearch(event) {
  const value = normalizeString(event.target.value);

  setFilters({
    search: value,
  });
}

function handleFiltersClick(event) {
  const button = event.target.closest(".filters-group__button");

  if (!button) {
    return;
  }

  const filterGroup = button.dataset.filterGroup;
  const filterValue = button.dataset.filterValue;

  const currentValues = filtersState[filterGroup];

  const isValueExists = currentValues.includes(filterValue);

  const nextValues = isValueExists
    ? currentValues.filter((value) => value !== filterValue)
    : [...currentValues, filterValue];

  setFilters({
    [filterGroup]: nextValues,
  });
}

function applyFilters() {
  let filteredAthletes = [...athletesList];

  // Search Field
  if (filtersState.search) {
    filteredAthletes = filterAthletesByFullName(
      filteredAthletes,
      filtersState.search,
    );
  }

  // Gender
  if (filtersState.gender.length) {
    filteredAthletes = filterAthletesByGenders(
      filteredAthletes,
      filtersState.gender,
    );
  }

  // Age category
  if (filtersState.age_category.length) {
    filteredAthletes = filterAthletesByAgeCategories(
      filteredAthletes,
      filtersState.age_category,
    );
  }

  // Discipline
  if (filtersState.discipline.length) {
    filteredAthletes = filterAthletesByDisciplines(
      filteredAthletes,
      filtersState.discipline,
    );
  }

  // Club
  if (filtersState.primary_club.length) {
    filteredAthletes = filterAthletesByPrimaryClubs(
      filteredAthletes,
      filtersState.primary_club,
    );
  }

  // Sports Grade
  if (filtersState.sports_grade.length) {
    filteredAthletes = filterAthletesBySportsGrades(
      filteredAthletes,
      filtersState.sports_grade,
    );
  }

  updateFilterResults(filteredAthletes);
}

function updateFilterResults(athletes) {
  // const hasActiveFilters = Object.values(filtersState).some(Boolean);
  const hasActiveFilters =
    filtersState.search ||
    filtersState.gender.length ||
    filtersState.age_category.length ||
    filtersState.discipline.length ||
    filtersState.primary_club.length ||
    filtersState.sports_grade.length;

  if (!hasActiveFilters) {
    resetFilterResults();
    return;
  }

  if (!athletes.length) {
    showNoFilterResultsMessage("No search results!");
    return;
  }

  renderFilterResults(athletes);
}

function restoreFiltersStateFromUrl() {
  const filters = getAthletesFiltersFromUrl();

  filtersState.search = filters.query || "";
  filtersState.gender = filters.gender ?? [];
  filtersState.age_category = filters.age_category ?? [];
  filtersState.discipline = filters.discipline ?? [];
  filtersState.primary_club = filters.club ?? [];
  filtersState.sports_grade = filters.grade ?? [];
}

function updateFiltersUI() {
  const buttons = refs.filterGroups.querySelectorAll(".filters-group__button");

  buttons.forEach((button) => {
    const filterGroup = button.dataset.filterGroup;
    const filterValue = button.dataset.filterValue;

    const isActive = filtersState[filterGroup].includes(filterValue);

    button.classList.toggle(CLASS_STATES.ACTIVE, isActive);
  });

  refs.searchInput.value = filtersState.search;
}

function setFilters(nextState) {
  Object.assign(filtersState, nextState);

  syncUrlFromFiltersState();
  updateFiltersUI();
  applyFilters();
}

function syncUrlFromFiltersState() {
  const url = new URL(window.location);

  // search
  updateSearchParams(url, "query", filtersState.search);

  updateSearchParams(url, "gender", filtersState.gender);
  updateSearchParams(url, "age_category", filtersState.age_category);
  updateSearchParams(url, "discipline", filtersState.discipline);
  updateSearchParams(url, "club", filtersState.primary_club);
  updateSearchParams(url, "grade", filtersState.sports_grade);

  window.history.replaceState({}, "", url);
}

export { initAthletesFiltersMultiselect };
