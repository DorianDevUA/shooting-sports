function buildPhysicalMetrics(athlete) {
  const { athlete_profile } = athlete;

  const isPhysicalMetricsExist =
    athlete_profile?.height || athlete_profile?.weight;

  if (!isPhysicalMetricsExist) {
    return;
  }

  return `<section class="athlete-info-group js-physical-metrics">
  <header class="athlete-info-group__header">
    <h3 class="athlete-info-group__title">Physical Metrics</h3>
  </header>

  <ul class="athlete-info-list">
    ${
      athlete_profile?.height
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Height</span>

      <span class="athlete-info-list__value">${athlete_profile?.height} cm</span>
    </li>`
        : ""
    }

    ${
      athlete_profile?.weight
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Weight</span>

      <span class="athlete-info-list__value">${athlete_profile?.weight} kg</span>
    </li>`
        : ""
    }
  </ul>
</section>`;
}

export { buildPhysicalMetrics };
