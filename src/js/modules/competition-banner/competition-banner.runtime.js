import {
  COMPETITION_BANNER_STATES,
  COMPETITION_BANNER_TEXTS,
} from "./competition-banner.constants.js";

function getCompetitionBannerRefs(bannerEl) {
  return {
    status: bannerEl.querySelector(".competition-banner__status"),
    button: bannerEl.querySelector(".competition-banner__link-btn"),
    timerLabel: bannerEl.querySelector(".competition-banner__timer-label"),
    timerValue: bannerEl.querySelector(".competition-banner__timer-value"),
  };
}

function getCompetitionBannerDates(bannerEl) {
  return {
    startDate: new Date(bannerEl.dataset.start),
    endDate: new Date(bannerEl.dataset.end),
    currentDate: new Date(),
  };
}

function getCompetitionBannerState(dates) {
  const { startDate, endDate, currentDate } = dates;

  if (currentDate < startDate) {
    return COMPETITION_BANNER_STATES.UPCOMING;
  }

  if (currentDate >= startDate && currentDate <= endDate) {
    return COMPETITION_BANNER_STATES.LIVE;
  }

  return COMPETITION_BANNER_STATES.FINISHED;
}

function calculateDaysUntilStart(startDate, currentDate) {
  const msPerDay = 1000 * 60 * 60 * 24;

  return Math.max(0, Math.ceil((startDate - currentDate) / msPerDay));
}

function updateCompetitionBannerClass(bannerEl, state) {
  bannerEl.classList.remove(
    "competition-banner--upcoming",
    "competition-banner--live",
    "competition-banner--finished",
  );

  bannerEl.classList.add(`competition-banner--${state}`);
}

function updateCompetitionBannerTexts(refs, texts) {
  refs.status.textContent = texts.status;
  refs.button.textContent = texts.button;
  refs.timerLabel.textContent = texts.timerLabel;
}

function updateCompetitionBannerTimer(refs, state, texts, dates) {
  const daysUntilStart = calculateDaysUntilStart(
    dates.startDate,
    dates.currentDate,
  );

  refs.timerValue.textContent =
    state === COMPETITION_BANNER_STATES.UPCOMING
      ? texts.timer(daysUntilStart)
      : texts.timer();
}

function updateCompetitionBannerState(bannerEl) {
  if (!bannerEl.isConnected) {
    return null;
  }

  const refs = getCompetitionBannerRefs(bannerEl);
  const dates = getCompetitionBannerDates(bannerEl);
  const state = getCompetitionBannerState(dates);
  const texts = COMPETITION_BANNER_TEXTS[state];

  updateCompetitionBannerClass(bannerEl, state);
  updateCompetitionBannerTexts(refs, texts);
  updateCompetitionBannerTimer(refs, state, texts, dates);

  return state;
}

export { updateCompetitionBannerState };
