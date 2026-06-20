function buildAthleteBiography(biography) {
  if (!biography) {
    return;
  }

  return `<section class="athlete-info-group athlete-biography js-athlete-bio">
  <header class="athlete-info-group__header">
    <h3 class="athlete-info-group__title">Biography</h3>
  </header>

  <div class="athlete-biography__content">
    ${biography}
  </div>
</section>`;
}

export { buildAthleteBiography };
