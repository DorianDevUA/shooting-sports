function createAthleteCard(athlete) {
  const {
    id,
    slug,
    images: { portrait },
    first_name,
    last_name,
    age_category,
    country,
    residence,
    teams,
    primary_club,
    main_discipline,
  } = athlete;

  const defaultUrl = "assets/images/athletes/defaults/avatar.png";

  // const nationalTeam = teams.find((team) => team.team_type.id === "national");
  // console.log("nationalTeam:", nationalTeam);

  return `<li class="swiper-slide" data-athlete-id="${id}">
                <article class="team-card">
                  <!-- Thumbnail -->
                  <div class="team-card__thumbnail">
                    <img
                      class="team-card__image"
                      src="${portrait?.url ?? defaultUrl}"
                      alt="${portrait?.alt ? portrait.alt : `Portrait of ${last_name} ${first_name}`}"
                      loading="lazy" />

                    <!-- Discipline Badge -->
                    <!-- <ul class="badges badges--top-left" aria-label="Shooting discipline">
                      <li class="badges__item">
                        <a class="badges__link" href="athletes/?discipline=${main_discipline.slug}" data-discipline="${main_discipline.id}">${main_discipline.name}</a>
                      </li>
                    </ul> -->

                    ${
                      age_category
                        ? `<!-- Age Category Badge -->
                    <ul class="badges badges--top-left" aria-label="Age Category">
                      <li class="badges__item">
                        <a class="badges__link" href="athletes/?age_category=${age_category.slug}" data-age-category="${age_category.id}">${age_category.code}</a>
                      </li>
                    </ul>`
                        : ""
                    }
                  </div>

                <p class="team-card__category">
                  <a
                    class="link"
                    href="athletes/?discipline=${main_discipline.slug}"
                  >
                    ${main_discipline.name}
                  </a>
                </p>

                  <!-- CONTENT -->
                  <div class="team-card__content">
                    <!-- Meta -->
                    <div class="team-card__meta">
                      <h3 class="team-card__name">
                        <a class="team-card__name-link" href="athletes/${slug}/">${last_name} ${first_name}</a>
                      </h3>
                      <!-- <p class="team-card__age">25 years</p> -->
                      ${
                        primary_club
                          ? `<p class="team-card__club">
                              <a
                                class="link"
                                href="athletes/?club=${primary_club.id}"
                              >
                        ${primary_club.acronym}</a>
                        </p>`
                          : ""
                      }
                      <p class="team-card__location">${residence.name}, ${residence.country.name}</p>
                    </div>

                    <div class="team-card__social socials">
                      <ul class="socials__list" aria-label="Social links">
                        <li>
                          <a class="socials__link" href="athletes/${slug}/" aria-label="Instagram">
                            <svg class="socials__icon" width="20" height="20" aria-hidden="true">
                              <use href="assets/icons/sprite.svg#icon-social-instagram"></use>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a class="socials__link" href="athletes/${slug}/" aria-label="X (Twitter)">
                            <svg class="socials__icon" width="20" height="20" aria-hidden="true">
                              <use href="assets/icons/sprite.svg#icon-social-x"></use>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a class="socials__link" href="athletes/${slug}/" aria-label="Facebook">
                            <svg class="socials__icon" width="20" height="20" aria-hidden="true">
                              <use href="assets/icons/sprite.svg#icon-social-facebook"></use>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a class="socials__link" href="athletes/${slug}/" aria-label="LinkedIn">
                            <svg class="socials__icon" width="20" height="20" aria-hidden="true">
                              <use href="assets/icons/sprite.svg#icon-social-linkedin"></use>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
              </li>`;
}

export function createSwiperAthleteCardList(athletes) {
  return athletes.map(createAthleteCard).join("");
}
