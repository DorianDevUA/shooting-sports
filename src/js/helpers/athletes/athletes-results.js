import { CLASS_STATES } from "../../constants/ui";
import { createAthleteCard } from "../../templates/athletes/athlete-card";

const refs = {
  results: document.querySelector(".filter-results"),
  resultList: document.querySelector(".filter-results__list"),
  resultMessage: document.querySelector(".filter-results__message"),
};

function showFilterResults() {
  refs.results.classList.add(CLASS_STATES.VISIBLE);
}

function hideFilterResults() {
  refs.results.classList.remove(CLASS_STATES.VISIBLE);
}

function clearFilterResultsList() {
  refs.resultList.innerHTML = "";
}

function populateFilterResultList(arr) {
  refs.resultList.innerHTML = arr.map(createAthleteCard).join("");
}

function showFilterResultsList() {
  refs.resultList.classList.add(CLASS_STATES.VISIBLE);
}

function hideFilterResultsList() {
  clearFilterResultsList();
  refs.resultList.classList.remove(CLASS_STATES.VISIBLE);
}

function setFilterResultsMessage(message) {
  refs.resultMessage.textContent = message;
}

function removeFilterResultsMessage() {
  refs.resultMessage.textContent = "";
}

function showFilterResultsMessage() {
  refs.resultMessage.classList.add(CLASS_STATES.VISIBLE);
}

function hideFilterResultsMessage() {
  removeFilterResultsMessage();
  refs.resultMessage.classList.remove(CLASS_STATES.VISIBLE);
}

function resetFilterResults() {
  hideFilterResultsMessage();
  hideFilterResultsList();
  hideFilterResults();
}

function renderFilterResults(athletes) {
  hideFilterResultsMessage();
  populateFilterResultList(athletes);
  showFilterResultsList();
  showFilterResults();
}

function showNoFilterResultsMessage(message = "No search results!") {
  hideFilterResultsList();
  setFilterResultsMessage(message);
  showFilterResultsMessage();
  showFilterResults();
}

export { resetFilterResults, renderFilterResults, showNoFilterResultsMessage };
