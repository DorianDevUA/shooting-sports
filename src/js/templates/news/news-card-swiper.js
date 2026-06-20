import { formatLongDate, formatShortDate } from "../../utils/date.js";
import { renderTags } from "./news-tags.js";

function createNewsCard(article) {
  const {
    id,
    slug,
    title,
    category,
    excerpt,
    content,
    media,
    published,
    tags,
  } = article;

  const shortDate = formatShortDate(published);
  const longDate = formatLongDate(published);

  return `<li class="swiper-slide" data-atricle-id="${id}">
  <article class="news-card">
    <!-- News Card Thumbnail -->
    <div class="news-card__thumb">
      <!-- News Card Image -->
      <img
        class="news-card__image"
        src="${media.cover?.url ?? "/public/assets/images/placeholder/placeholder-news.png"}"
        alt="${media.cover?.alt ?? `${title}`}"
        width="${media.cover?.width ?? 350}"
      />

      <!-- News Card Overlay -->
      <div class="news-card__overlay">
        <!-- News Card Excerpt -->
        <p class="news-card__excerpt">${excerpt}</p>
      </div>
    </div>

    <p class="news-card__category">
      <a class="link" href="news/?category=${category.id}" data-news-category="${category.id}">
        ${category.name}
      </a>
    </p>

    <!-- News Card Content + Meta -->
    <div class="news-card__content">
      <!-- News Card Tags -->
      ${renderTags(tags)}

      <!-- News Card Title -->
      <h3 class="news-card__title">
        <a class="link" href="news/${slug}/">${title}</a>
      </h3>

      <!-- News Card Meta -->
      <div class="news-card__meta">
        <!-- News Card Post Date -->
        <time class="news-card__date" datetime="${published}">
          <svg class="icon" width="16" height="16" aria-hidden="true">
            <use href="assets/icons/sprite.svg#icon-ui-calendar"></use>
          </svg>
          <span class="text">${longDate}</span>
        </time>

        <!-- News Card Link -->
        <a class="news-card__link" href="news/${slug}/">
          <span class="text">Read more</span>
          <span class="u-sr-only">
            about the ${title}
          </span>
        </a>
      </div>
    </div>
  </article>
</li>`;
}

export function createSwiperNewsCardList(news) {
  return news.map(createNewsCard).join("");
}

function createNewsSwiperSlide(article) {
  const {
    id,
    slug,
    title,
    category,
    excerpt,
    content,
    media,
    published,
    tags,
  } = article;

  const shortDate = formatShortDate(published);
  const longDate = formatLongDate(published);

  return `<li class="swiper-slide" data-atricle-id="${id}">
  <article class="news-card">
    <!-- News Card Thumbnail -->
    <div class="news-card__thumb">
      <!-- News Card Image -->
      <img
        class="news-card__image"
        src="${media?.cover?.url ?? "/public/assets/images/placeholder/placeholder-news.png"}"
        alt="${media?.cover?.alt ?? `${title}`}"
        width="${media?.cover?.width ?? 350}"
      />

      <!-- News Card Overlay -->
      <div class="news-card__overlay">
        <!-- News Card Excerpt -->
        <p class="news-card__excerpt">${excerpt}</p>
      </div>
    </div>

    <p class="news-card__category">
      <a class="link" href="news/?category=${category.id}" data-news-category="${category.id}">
        ${category.name}
      </a>
    </p>

    <!-- News Card Content + Meta -->
    <div class="news-card__content">
      <!-- News Card Tags -->
      ${renderTags(tags)}

      <!-- News Card Title -->
      <h3 class="news-card__title">
        <a class="link" href="news/${slug}/">${title}</a>
      </h3>

      <!-- News Card Meta -->
      <div class="news-card__meta">
        <!-- News Card Post Date -->
        <time class="news-card__date" datetime="${published}">
          <svg class="icon" width="16" height="16" aria-hidden="true">
            <use href="assets/icons/sprite.svg#icon-ui-calendar"></use>
          </svg>
          <span class="text">${longDate}</span>
        </time>

        <!-- News Card Link -->
        <a class="news-card__link" href="news/${slug}/">
          <span class="text">Read More</span>
          <span class="u-sr-only">
            about the ${title}
          </span>
        </a>
      </div>
    </div>
  </article>
</li>`;
}

function createArticlesSwiper(news) {
  return `<!-- Related News Slider (main container) -->
<div class="articles-slider swiper">
  <!-- Slider Wrapper -->
  <div class="articles-slider__wrapper">
    <!-- Swiper additional required wrapper -->
    <ul class="swiper-wrapper">
      <!-- Swiper Slides -->
      ${news.map(createNewsSwiperSlide).join("")}
    </ul>

    <!-- Swiper Pagination -->
    <div class="articles-slider__pagination swiper-pagination"></div>

    <!-- Swiper Navigation buttons -->
    <button class="articles-slider__btn-prev swiper-button-prev">
      <svg width="32" height="32" aria-hidden="true">
        <use href="assets/icons/sprite.svg#icon-ui-chevron-left"></use>
      </svg>
    </button>
    <button class="articles-slider__btn-next swiper-button-next">
      <svg width="32" height="32" aria-hidden="true">
        <use href="assets/icons/sprite.svg#icon-ui-chevron-right"></use>
      </svg>
    </button>
  </div>
</div>`;
}

export { createArticlesSwiper, createNewsSwiperSlide };
