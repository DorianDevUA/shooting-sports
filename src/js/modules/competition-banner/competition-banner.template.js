import { formatDateRange } from "../../utils/date.js";

function createCompetitionBannerTemplate(competitionEvent) {
  const {
    slug,
    title,
    disciplines = [],
    description = "Follow Azerbaijan national team performance, schedules and live updates.",
    location,
    start_date,
    end_date,
  } = competitionEvent;

  return `
    <div class="competition-banner__content">
      <div class="competition-banner__meta">
        <span class="competition-banner__status"></span>

        <p class="competition-banner__timer">
          <span class="competition-banner__timer-label"></span>
          <span class="competition-banner__timer-value"></span>
        </p>
      </div>

      <div class="competition-banner__main">
        <h2 class="competition-banner__title">
          ${title}
          ${
            disciplines.length
              ? `<span class="competition-banner__disciplines">- ${disciplines.join(" / ")}</span>`
              : ""
          }
        </h2>

        <p class="competition-banner__location">
          <svg class="competition-banner__flag" width="43" height="32">
            <use href="${location.country.flag}"></use>
          </svg>
          <span class="competition-banner__venue">${location.city.name}, ${location.country.name}</span>
        </p>

        <p class="competition-banner__date">
          ${formatDateRange(start_date, end_date)}
        </p>

        <p class="competition-banner__description">
          ${description}
        </p>
      </div>
    </div>

    <div class="competition-banner__actions">
      <a class="competition-banner__link-btn" href="competitions/${slug}/"></a>
    </div>
  `;
}

export { createCompetitionBannerTemplate };
