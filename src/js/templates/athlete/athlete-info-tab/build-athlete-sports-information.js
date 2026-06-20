function buildAthleteSportsInformation(athlete) {
  console.log("Athlete:", athlete);

  const { events, athlete_profile } = athlete;

  const isSportsInfoExist =
    athlete_profile?.started_shooting_year ||
    athlete_profile?.started_competing_year ||
    athlete_profile?.handedness ||
    athlete_profile?.dominant_eye ||
    events.length;
  if (!isSportsInfoExist) {
    return;
  }

  return `<section class="athlete-info-group js-sports-info">
  <header class="athlete-info-group__header">
    <h3 class="athlete-info-group__title">Sports Information</h3>
  </header>

  <ul class="athlete-info-list">
    ${
      athlete_profile?.started_shooting_year
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Practising shooting since</span>

      <span class="athlete-info-list__value">${athlete_profile?.started_shooting_year}</span>
    </li>`
        : ""
    }

    ${
      athlete_profile?.started_competing_year
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Start of competing</span>

      <span class="athlete-info-list__value">${athlete_profile?.started_competing_year}</span>
    </li>`
        : ""
    }

    ${
      athlete_profile?.handedness
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Dominant hand</span>

      <span class="athlete-info-list__value">${athlete_profile?.handedness.short_name}</span>
    </li>`
        : ""
    }

    ${
      athlete_profile?.dominant_eye
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Master eye</span>

      <span class="athlete-info-list__value">${athlete_profile?.dominant_eye.short_name}</span>
    </li>`
        : ""
    }

    ${
      events.length
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Events</span>

      <div class="athlete-info-list__value">
        <ul class="athlete-events">
          ${events
            .map(
              (e) => `<li class="athlete-events__item">
            <a class="athlete-events__link" href="disciplines/?${e.slug}">${e.code}</a>
          </li>`,
            )
            .join("")}
        </ul>
      </div>
    </li>`
        : ""
    }

  </ul>
</section>
`;
}

export { buildAthleteSportsInformation };
