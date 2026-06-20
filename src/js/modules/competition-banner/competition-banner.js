import {
  COMPETITION_BANNER_STATES,
  UPDATE_INTERVAL,
} from "./competition-banner.constants.js";
import { updateCompetitionBannerState } from "./competition-banner.runtime.js";
import { createCompetitionBannerTemplate } from "./competition-banner.template.js";

const bannerIntervals = new WeakMap();

function stopCompetitionBannerTimer(bannerEl) {
  const intervalId = bannerIntervals.get(bannerEl);

  if (!intervalId) {
    return;
  }

  clearInterval(intervalId);
  bannerIntervals.delete(bannerEl);
}

function startCompetitionBannerTimer(bannerEl) {
  const intervalId = setInterval(() => {
    const state = updateCompetitionBannerState(bannerEl);

    if (!state || state === COMPETITION_BANNER_STATES.FINISHED) {
      stopCompetitionBannerTimer(bannerEl);
    }
  }, UPDATE_INTERVAL);

  bannerIntervals.set(bannerEl, intervalId);
}

function prepareCompetitionBannerRoot(bannerEl, competitionEvent) {
  bannerEl.classList.add("competition-banner");
  bannerEl.dataset.start = competitionEvent.start_date;
  bannerEl.dataset.end = competitionEvent.end_date;
}

function renderCompetitionBannerMarkup(bannerEl, competitionEvent) {
  bannerEl.innerHTML = createCompetitionBannerTemplate(competitionEvent);
}

function mountCompetitionBanner(bannerEl, competitionEvent) {
  stopCompetitionBannerTimer(bannerEl);
  prepareCompetitionBannerRoot(bannerEl, competitionEvent);
  renderCompetitionBannerMarkup(bannerEl, competitionEvent);

  const initialState = updateCompetitionBannerState(bannerEl);

  if (initialState !== COMPETITION_BANNER_STATES.FINISHED) {
    startCompetitionBannerTimer(bannerEl);
  }

  return bannerEl;
}

export { mountCompetitionBanner };
