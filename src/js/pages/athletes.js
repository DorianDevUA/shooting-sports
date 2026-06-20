import { fetchAthletes } from "../api/athletes-api";
import { FiltersPanel } from "../modules/filters-panel/filters-panel.js";
import { initAthletesFilters } from "../helpers/athletes/athletes-filters.js";
import { initAthletesFiltersMultiselect } from "../helpers/athletes/athletes-filters-multiselect.js";
import { initAthletesSliders } from "../helpers/athletes/athletes-sliders.js";
import { mountCompetitionBanner } from "../modules/competition-banner/competition-banner.js";

const competitionEvent = {
  slug: "issf-world-cup-rifle-pistol-munich-germany-2026",
  title: "ISSF World Cup",
  disciplines: ["Rifle", "Pistol"],
  description:
    "Follow Azerbaijan national team performance, schedules and live updates.",
  location: {
    city: {
      id: "munich",
      name: "Munich",
    },
    country: {
      id: "germany",
      name: "Germany",
      flag: "assets/icons/flags/sprite.svg#icon-flag-de",
    },
  },

  start_date: "2026-05-24",
  end_date: "2026-05-31",
};

const competitionBaner = document.querySelector(
  ".js-athletes-page-event-banner",
);

async function initAthletesPage() {
  console.log("Athletes page init");

  try {
    const athletes = await fetchAthletes();

    new FiltersPanel({
      toggleSelector: ".page-filters__toggle",
      panelSelector: ".page-filters__panel",
    });

    // initAthletesFilters(athletes);
    mountCompetitionBanner(competitionBaner, competitionEvent);
    initAthletesFiltersMultiselect(athletes);
    initAthletesSliders(athletes);
  } catch (error) {
    console.error("❌ Athletes page init failed:", error);
  }
}

export { initAthletesPage };
