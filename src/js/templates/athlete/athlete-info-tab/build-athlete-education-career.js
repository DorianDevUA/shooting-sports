function buildAthleteEducationCareer(athlete) {
  const { education, occupation } = athlete;

  const isEduCareerExist = education || occupation;

  if (!isEduCareerExist) {
    return;
  }

  return `<section class="athlete-info-group js-education-career">
  <header class="athlete-info-group__header">
    <h3 class="athlete-info-group__title">Education & Career</h3>
  </header>

  <ul class="athlete-info-list">
    ${
      education
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label"> Education </span>

      <span class="athlete-info-list__value">
        ${education.level.name}${education.qualification ? `, ${education.qualification.name} in ${education.specialization.name}` : ""}
      </span>
    </li>`
        : ""
    }

    ${
      occupation
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label"> Profession </span>

      <span class="athlete-info-list__value">${occupation.name}</span>
    </li>`
        : ""
    }
  </ul>
</section>`;
}

export { buildAthleteEducationCareer };
