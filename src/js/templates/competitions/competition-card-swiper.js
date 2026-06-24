import { formatLongDate, formatShortDate } from "../../utils/date.js";

function createCompetitionSwiperCard(edition) {
  const {
    id,
    slug,
    short_name,
    city,
    excerpt,
    competition,
    category,
    status,
    disciplines,
    media,
    start_date,
    end_date,
  } = edition;

  const defaultImageUrl =
    "assets/images/placeholder/no-image-placeholder-1920x1080-blue.png";

  const formatedStartDate = formatShortDate(start_date);
  const formatedEndDate = formatLongDate(end_date);

  return `<li class="swiper-slide" data-competition-id="${id}">
  <article class="competition-card" data-status="completed" data-types="national">
    <!-- Competition Card Media Thumb -->
    <div class="competition-card__thumb">
      <!-- Competition Card Image -->
      <img
        class="competition-card__image"
        src="${media.cover?.url ?? defaultImageUrl} "
        alt="Textual replacement for the image"
        width="260"
        loading="lazy"
      />

      <!-- Competition Card Thumb Overlay -->
      <div class="competition-card__overlay">
        <a class="link" href="competitions/${slug}/"> View event </a>
      </div>

      <!-- Competition category badge -->
      <ul class="badges badges--top-left" aria-label="Competition category">
        <li>
          <a
            class="badges__link"
            href="competitions/?category=${category.id}"
            data-category="${category.id}"
          >
            ${category.short_name}
          </a>
        </li>
      </ul>

      <!-- Competition category badge -->
      <ul class="badges badges--bottom-right" aria-label="Competition status">
        <li>
          <a
            class="badges__link"
            href="competitions/?status=${status}"
            data-status="${status}"
          >
            ${status}
          </a>
        </li>
      </ul>
    </div>

    <!-- Competition Card Edition -->
    <!-- <p class="competition-card__category"><a href="competitions/?edition=${competition.id}">${competition.name}</a></p> -->

    <p class="competition-card__level">
      <a
        class="link"
        href="competitions/?level=${competition.level.id}"
        data-level="${competition.level.id}"
      >
        ${competition.level.name}
      </a>
    </p>

    <!-- Competition Card Content -->
    <div class="competition-card__content">
      <h3 class="competition-card__title">
        <a class="link" href="competitions/${slug}/">
          <span class="competition-card__type">${short_name}</span>
          ${createDisciplineListMarkup(disciplines)}
        </a>
      </h3>
      <!-- ${createCompetitionDisciplineList(disciplines)} -->
      <p class="competition-card__description">${excerpt}</p>
      <div class="competition-card__info">
        <!-- Competition Card Flag -->
        <svg
          class="competition-card__flag"
          width="43"
          height="32"
          aria-hidden="true"
        >
          <use href="assets/icons/flags/sprite.svg#icon-flag-${city.country.id}"></use>
        </svg>
        <div class="competition-card__meta">
          <!-- Competition Card Location -->
          <p class="competition-card__location">
            <a
              class="link"
              href="competitions/?city=${city.id}&country=${city.country.slug}"
              data-city="${city.id}"
              data-country="${city.country.id}"
            >
              ${city.name}, ${city.country.name}
            </a>
          </p>
          <!-- Competition Card Date -->
          <p class="competition-card__date">
            <time datetime="${start_date}">${formatedStartDate}</time> -
            <time datetime="${end_date}">${formatedEndDate}</time>
          </p>
        </div>
      </div>
    </div>
  </article>
</li>`;
}

export function createCompetitionDisciplineList(disciplines) {
  if (!disciplines.length) {
    return "";
  }

  console.log(disciplines);

  return `<ul class="competition-card__event-list">
  ${disciplines
    .toSorted((a, b) => a.sort_order - b.sort_order)
    .map(
      ({ id, name }) => `<li class="competition-card__event">
    <a class="link" href="competitions/?discipline=${id}">
      ${name}
    </a>
  </li>`,
    )
    .join("")}
</ul>`;
}

export function createDisciplineListMarkup(disciplines) {
  if (!disciplines.length) {
    return "";
  }

  console.log(disciplines);

  return `
  ${disciplines
    .toSorted((a, b) => a.sort_order - b.sort_order)
    .map(
      ({ id, name }) =>
        `<span class="competition-card__discipline">${name}</span>`,
    )
    .join("")}
`;
}

export function createSwiperCompetitionCardList(competitions) {
  return competitions.map(createCompetitionSwiperCard).join("");
}
