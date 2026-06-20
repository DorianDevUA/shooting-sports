function createRelatedCard(article) {
  const { id, slug, title, category, media, published, tags } = article;

  return `<li data-atricle-id="${id}">
  <article class="related-card">
    <div class="related-card__media">
      <img
        class="related-card__image"
        src="${media.cover.url}"
        alt="${media.cover.alt}"
      />
    </div>

    <div class="related-card__content">
      <p class="related-card__category">
        <a class="link" href="news/?category=${category.id}">${category.name}</a>
      </p>

      <h3 class="related-card__title">
        <a class="link" href="news/${slug}/">${title}</a>
      </h3>
    </div>
  </article>
</li>`;
}

export { createRelatedCard };
