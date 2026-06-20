import { fetchArticles } from "../api/articles-api.js";
import { ARTICLE_CATEGORIES, CLASS_STATES } from "../constants/ui.js";
import {
  filterArticlesByCategory,
  getFilteredArticles,
} from "../helpers/articles/filter-articles.js";
import { sortArticlesByPublishDate } from "../helpers/articles/sort-articles.js";
import { initArticlesSlider } from "../modules/sliders/articles-slider/articles-slider.js";
import { initCompNewsSlider } from "../modules/sliders/news/slider-competition-news.js";
import { initLtstNewsSlider } from "../modules/sliders/news/slider-latest-news.js";
import { initFilteredNewsSlider } from "../modules/sliders/news/slider-filtered-news.js";
import { initStoriesNewsSlider } from "../modules/sliders/news/slider-stories-news.js";
import { createSwiperNewsCardList } from "../templates/news/news-card-swiper.js";
import { getQueryParam } from "../helpers/url/search-params.js";
import { initFeaturedNewsSlider } from "../modules/sliders/news/slider-featured-news.js";
import { mountCompetitionBanner } from "../modules/competition-banner/competition-banner.js";

const refs = {
  filteredNewsSection: document.querySelector("section[data-news='filtered']"),
  competitionSection: document.querySelector(
    "section[data-news='competitions']",
  ),
  competitionNewsSlider: document.querySelector(".js-list-competition-news"),
  latestNewsSlider: document.querySelector(".js-list-latest-news"),
  filteredNewsSlider: document.querySelector(".js-list-filtered-news"),
  storiesNewsSlider: document.querySelector(".js-list-stories-news"),
  eventBanner: document.querySelector(".js-news-event-banner"),
};

const competitionEvent = {
  slug: "issf-world-cup-granada-2026",
  title: "ISSF World Cup Granada 2026",
  disciplines: ["Pistol", "Rifle", "Shotgun"],
  description:
    "Follow Azerbaijan national team performance, schedules and live updates.",
  location: {
    city: {
      name: "Granada",
    },
    country: {
      name: "Spain",
      flag: "assets/icons/flags/sprite.svg#icon-flag-es",
    },
  },
  start_date: "2026-04-05",
  end_date: "2026-04-13",
};

export async function initNewsPage() {
  console.log("News page init");

  try {
    // const [articles] = await Promise.all([fetchArticles()]);
    const articles = await fetchArticles();
    const sortedNews = sortArticlesByPublishDate(articles);

    mountCompetitionBanner(refs.eventBanner, competitionEvent);

    renderFeaturedSlider();
    renderFilteredNews(sortedNews);
    renderLatestNews(sortedNews);
    renderCompetitionNews(sortedNews);
    renderStoriesSlider(sortedNews);
  } catch (error) {
    console.error("❌ News page init failed:", error);
  }
}

function renderLatestNews(news) {
  refs.latestNewsSlider.innerHTML = createSwiperNewsCardList(news);
  // Latest News Slider
  initLtstNewsSlider();
}

function renderCompetitionNews(news) {
  const competitionNews = filterArticlesByCategory(
    news,
    ARTICLE_CATEGORIES.NEWS,
  );

  if (!competitionNews.length) {
    refs.competitionSection.style.display = "none";

    return;
  }

  refs.competitionNewsSlider.innerHTML =
    createSwiperNewsCardList(competitionNews);

  // Competition News Slider
  initCompNewsSlider();
}

function renderStoriesSlider(news) {
  const storiesNews = filterArticlesByCategory(
    news,
    ARTICLE_CATEGORIES.INTERVIEWS,
  );
  // Stories News Slider
  initStoriesNewsSlider();
}

function renderFeaturedSlider(news) {
  // const storiesNews = filterArticlesByCategory(
  //   news,
  //   ARTICLE_CATEGORIES.INTERVIEWS,
  // );
  // Stories News Slider
  initFeaturedNewsSlider();
}

// function renderFilteredNews(news) {
//   const category = getQueryParam("category");

//   if (!category) {
//     refs.filteredNewsSection.style.display = "none";
//     return;
//   }

//   const filteredNews = filterArticlesByCategory(news, category);

//   if (!filteredNews.length) {
//     refs.filteredNewsSection.style.display = "none";

//     return;
//   }

//   refs.filteredNewsSlider.innerHTML = createSwiperNewsCardList(filteredNews);

//   // Filtered News Slider
//   initFilteredNewsSlider();
// }

function getNewsFilters() {
  const params = new URLSearchParams(window.location.search);

  console.log("All Tags:", params.getAll("tag"));
  console.log("All Ctgs:", params.getAll("category"));
  return {
    categories: params.getAll("category"),
    tags: params.getAll("tag"),
  };
}

function renderFilteredNews(news) {
  // Отримуємо всі активні filters з URL.
  const filters = getNewsFilters();

  // CHECK ACTIVE FILTERS
  // Перевіряємо: чи є хоча б один активний filter, якщо: categories = [], tags = [], тоді: hasActiveFilters = false
  const hasActiveFilters = filters.categories.length || filters.tags.length;

  // Якщо активних filters немає: ховаємо filteredNewsSection та виходимо з функції
  if (!hasActiveFilters) {
    refs.filteredNewsSection.classList.add(CLASS_STATES.HIDDEN);

    return;
  }

  // FILTER ARTICLES
  // Фільтруємо новини по всіх активних filters
  const filteredNews = getFilteredArticles(news, filters);

  // EMPTY FILTER RESULT
  // Якщо після фільтрації новин не залишилось: ховаємо секцію та виходимо з функції, не ініціалізуємо slider
  if (!filteredNews.length) {
    refs.filteredNewsSection.classList.add(CLASS_STATES.HIDDEN);
    return;
  }

  // SHOW FILTERED SECTION
  // Якщо новини є: показуємо секцію, рендеримо cards, ініціалізуємо slider
  refs.filteredNewsSlider.innerHTML = createSwiperNewsCardList(filteredNews);

  // Init Filtered News Slider
  initFilteredNewsSlider();
}
