function buildAthletePersonalInterests(athlete) {
  const { hobbies } = athlete;

  if (!hobbies.length) {
    return;
  }

  return `<section class="athlete-info-group js-personal-interests">
  <header class="athlete-info-group__header">
    <h3 class="athlete-info-group__title">Personal Interests</h3>
  </header>

  <ul class="athlete-info-list">
    <li class="athlete-info-list__item">
      <span class="athlete-info-list__label"> Hobbies </span>
      <span class="athlete-info-list__value">
        <ul class="details-sublist">
          ${
            hobbies.length
              ? hobbies
                  .map(
                    (hobby) => `<li class="details-sublist__item">
            <span>${hobby.name}</span>
          </li>`,
                  )
                  .join("")
              : ""
          }
        </ul>
      </span>
    </li>
  </ul>
</section>`;
}
export { buildAthletePersonalInterests };

{
  /* <ul class="athlete-info-list">
  $
  {hobbies.length
    ? hobbies
        .map(
          (hobby) => `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label"> Hobbies </span>
      <span class="athlete-info-list__value"> Internet, reading, chess </span>
    </li>`,
        )
        .join("")
    : ""}
</ul>; */
}
