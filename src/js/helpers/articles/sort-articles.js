function sortArticlesByPublishDate(articles) {
  return articles
    .slice() // щоб не мутувати оригінал
    .sort((a, b) => new Date(b.published) - new Date(a.published));
}

export { sortArticlesByPublishDate };
