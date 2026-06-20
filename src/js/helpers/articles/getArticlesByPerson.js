function getArticlesByPerson({ personId, articles, relations }) {
  // 1. Знаходимо всі зв’язки для цього спортсмена
  const relatedArticleIds = relations
    .filter(
      (rel) =>
        rel.entity_id === personId &&
        rel.entity_type === "person" &&
        rel.is_active,
    )
    .map((rel) => rel.article_id);

  // 2. Фільтруємо статті
  const result = articles.filter((article) =>
    relatedArticleIds.includes(article.id),
  );

  return result;
}

// function getArticlesByPerson({ personId, articles, relations }) {
//   const articleIdsSet = new Set(
//     relations
//       .filter(
//         (rel) =>
//           rel.entity_id === personId &&
//           rel.entity_type === "person" &&
//           rel.is_active,
//       )
//       .map((rel) => rel.article_id),
//   );

//   return articles.filter((article) => articleIdsSet.has(article.id));
// }

export { getArticlesByPerson };
