import { CLASS_STATES } from "../../constants/ui.js";
import { debounce } from "../../utils/debounce.js";
import { normalizeString } from "../../utils/string.js";
import {
  renderFilterResults,
  resetFilterResults,
  showNoFilterResultsMessage,
} from "./athletes-results.js";
import {
  filterAthletesByDiscipline,
  filterAthletesByGender,
  filterAthletesByAgeCategory,
  filterAthletesByPrimaryClub,
  filterAthletesByFullName,
  filterAthletesBySportsGrade,
} from "./filter-athletes.js";

const refs = {
  searchInput: document.querySelector(".js-athlete-search"),
  filterGroups: document.querySelector(".page-filters__groups"),
};

const filtersState = {
  search: "",

  gender: null,
  age_category: null,
  discipline: null,
  primary_club: null,
  sports_grade: null,
};

let athletesList = [];

function initAthletesFilters(athletes) {
  athletesList = athletes;

  bindEvents();
}

function bindEvents() {
  const debouncedSearch = debounce(handleInputSearch, 600);

  refs.searchInput?.addEventListener("input", debouncedSearch);
  refs.filterGroups?.addEventListener("click", handleFiltersClick);
}

function handleInputSearch(event) {
  filtersState.search = normalizeString(event.target.value);

  applyFilters();
}

function handleFiltersClick(event) {
  const button = event.target.closest(".filters-group__button");

  if (!button) {
    return;
  }

  const filterGroup = button.dataset.filterGroup;
  const filterValue = button.dataset.filterValue;

  const isActive = button.classList.contains(CLASS_STATES.ACTIVE);

  clearFilterGroup(filterGroup);

  if (isActive) {
    filtersState[filterGroup] = null;
  } else {
    button.classList.add(CLASS_STATES.ACTIVE);

    filtersState[filterGroup] = filterValue;
  }

  applyFilters();
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
  if (filtersState.gender) {
    filteredAthletes = filterAthletesByGender(
      filteredAthletes,
      filtersState.gender,
    );
  }

  // Age category
  if (filtersState.age_category) {
    filteredAthletes = filterAthletesByAgeCategory(
      filteredAthletes,
      filtersState.age_category,
    );
  }

  // Discipline
  if (filtersState.discipline) {
    filteredAthletes = filterAthletesByDiscipline(
      filteredAthletes,
      filtersState.discipline,
    );
  }

  // Club
  if (filtersState.primary_club) {
    filteredAthletes = filterAthletesByPrimaryClub(
      filteredAthletes,
      filtersState.primary_club,
    );
  }

  // Sport Grade
  if (filtersState.sports_grade) {
    filteredAthletes = filterAthletesBySportsGrade(
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
    filtersState.gender ||
    filtersState.age_category ||
    filtersState.discipline ||
    filtersState.primary_club ||
    filtersState.sports_grade;

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

function clearFilterGroup(group) {
  const activeButtons = refs.filterGroups.querySelectorAll(
    `.filters-group__button[data-filter-group="${group}"].is-active`,
  );

  activeButtons.forEach((button) => {
    button.classList.remove(CLASS_STATES.ACTIVE);
  });
}

export { initAthletesFilters };
