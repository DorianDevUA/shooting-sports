import { fetchArticleRelations, fetchArticles } from "../api/articles-api.js";
import { getPageSlugFromURL } from "../utils/url.js";
import { initMoreNewsSlider } from "../modules/sliders/more-news-slider/more-news-slider.js";
import { createNewsSwiperSlide } from "../templates/news/news-card-swiper.js";
import { createRelatedCard } from "../templates/news/related-news-card.js";
import { formatLongDate } from "../utils/date.js";

async function initArticlePage() {
  console.log("init Article Page");

  try {
    const [articles, articleRels] = await Promise.all([
      fetchArticles(),
      fetchArticleRelations(),
    ]);

    const refs = getArticlePageRefs();
    const pageSlug = getPageSlugFromURL();

    const article = articles.find((art) => art.slug === pageSlug);

    const articleTags = getArticleTags(article);
    renderArticleTags(refs.articleTags, articleTags);

    const relaredNews = getRelatedArticles(article.id, articles, articleRels);
    renderRelatedNews(refs.relatedNews, relaredNews);

    // const moreNews
    const moreNews = articles.filter((art) => art.slug !== article.slug);
    renderMoreNews(refs.moreNews, moreNews);

    buildNewsArticle(article, articles, articleRels);

    initMoreNewsSlider();
  } catch (error) {
    console.error("❌ Article page init failed:", error);
  }
}

function getArticleTags({ tags = [] }) {
  if (!tags.length) {
    return [];
  }

  return tags.map((tag) => ({
    id: tag.id,
    code: tag.code,
    name: tag.name,
    slug: tag.slug,
    group: tag.group.name,
  }));
}

function getMoreNews(articleSlug, articles) {
  return articles.filter((art) => art.slug !== articleSlug);
}

function getRelatedArticles(articleId, articles, articleRels) {
  // Создаём быстрый lookup articles by id
  const articlesMap = new Map(articles.map((article) => [article.id, article]));

  // Отримуємо зв'язки поточної статті
  const relations = articleRels.filter(
    (rel) => rel.article_id === articleId && rel.entity_type_id === "article",
  );

  // Повертаємо пов'язані статті
  return relations.map((rel) => articlesMap.get(rel.entity_id));
}

function getArticlePageRefs() {
  return {
    articleTags: document.querySelector(".js-article-tags"),
    moreNews: document.querySelector(".js-more-news-list"),
    relatedNews: document.querySelector(".js-related-news-list"),
    articleHero: document.querySelector(".js-article-hero"),
    articleContent: document.querySelector(".js-article-content"),
  };
}

function renderMoreNews(container, news) {
  container.innerHTML = news.map(createNewsSwiperSlide).join("");
}

function renderArticleHero(container, article) {
  container.innerHTML = createArticleHeroMarkup(article);
}

function renderArticleContent(container, article) {
  container.innerHTML = article.content;
}

function buildNewsArticle(article, articles, articleRels) {
  const refs = getArticlePageRefs();

  renderArticleHero(refs.articleHero, article);
  renderArticleContent(refs.articleContent, article);
}

function renderArticleTags(container, tags) {
  if (!tags.length) {
    container.innerHTML = `<li>No article tags</li>`;
  } else {
    container.innerHTML = createArticleTagList(tags);
  }
}

function createArticleTagList(tags) {
  return tags
    .map(
      (tag) => `<li class="tags__item">
      <a class="tags__link" href="news/?tag=${tag.id}">${tag.name}</a>
    </li>`,
    )
    .join("");
}

function renderRelatedNews(container, news) {
  if (!news.length) {
    container.innerHTML = `<li>No related news</li>`;
  } else {
    container.innerHTML = news.slice(0, 3).map(createRelatedCard).join("");
  }
}

function createArticleHeroMarkup(article) {
  const { title, excerpt, category, published, media } = article;
  return `<div class="article-hero">
  <!-- Article Hero Media -->
  <div class="article-hero__media">
    <img
      class="article-hero__image"
      src="${media.cover?.url}"
      alt="${media.cover?.alt ?? title}"
      ${media.cover?.width ? `width=${media.cover.width}` : ""}
      loading="lazy"
    />
  </div>

  <!-- Article Hero Content -->
  <div class="article-hero__content">
    <!-- Article Category -->
    <span class="article-hero__category">${category.name}</span>

    <!-- Article Title -->
    <h2 class="article-hero__title">${title}</h2>

    <!-- Article Excerpt -->
    <p class="article-hero__excerpt">${excerpt}</p>

    <!-- Article Meta -->
    <div class="article-hero__meta">
      <!-- Article Post Date -->
      <time class="article-hero__post-date" datetime="${published}">
        <svg class="icon" width="16" height="16" aria-hidden="true">
          <use href="assets/icons/sprite.svg#icon-ui-calendar"></use>
        </svg>
        <span class="text">${formatLongDate(published)}</span>
      </time>

      <!-- Article Share Buttons -->
      <div class="article-hero__share article-share">
        <ul class="article-share__list" aria-label="Social links">
          <li class="article-share__item">
            <button
              type="button"
              class="article-share__button"
              aria-label="Telegram"
            >
              <svg class="icon" width="20" height="20" aria-hidden="true">
                <use href="assets/icons/sprite.svg#icon-social-telegram"></use>
              </svg>
            </button>
          </li>
          <li class="article-share__item">
            <button
              type="button"
              class="article-share__button"
              aria-label="X (Twitter)"
            >
              <svg class="icon" width="20" height="20" aria-hidden="true">
                <use href="assets/icons/sprite.svg#icon-social-x"></use>
              </svg>
            </button>
          </li>
          <li class="article-share__item">
            <button
              type="button"
              class="article-share__button"
              aria-label="Facebook"
            >
              <svg class="icon" width="20" height="20" aria-hidden="true">
                <use href="assets/icons/sprite.svg#icon-social-facebook"></use>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>`;
}

export { initArticlePage };
