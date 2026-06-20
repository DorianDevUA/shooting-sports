function buildAthleteCoaching({ coaches }) {
  const { personal, national } = coaches;

  const isCoachingExist = personal || national;

  if (!isCoachingExist) {
    return;
  }

  return `<section class="athlete-info-group js-coaching">
  <header class="athlete-info-group__header">
    <h3 class="athlete-info-group__title">Coaching</h3>
  </header>

  <ul class="athlete-info-list">
    ${
      personal
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Personal coach</span>

      <span class="athlete-info-list__value">${personal.full_name}</span>
    </li>`
        : ""
    }

    ${
      national
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">National coach</span>

      <span class="athlete-info-list__value">${national.full_name}</span>
    </li>`
        : ""
    }
  </ul>
</section>`;
}

export { buildAthleteCoaching };
