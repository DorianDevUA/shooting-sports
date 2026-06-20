import {
  fetchArticles,
  fetchAthleteArticleRelations,
} from "../api/articles-api.js";

/**
 * Отримати всі статті пов'язані з сутністю
 *
 * @param {string} entityId
 * @param {string} entityType
 */
async function getArticlesByEntity({ entityId, entityType }) {
  const [articles, relations] = await Promise.all([
    fetchArticles(),
    fetchAthleteArticleRelations(),
  ]);

  // 1. Знаходимо всі relation для цієї сутності
  const relatedIds = relations
    .filter(
      (rel) =>
        rel.entity_id === entityId &&
        rel.entity_type_id === entityType &&
        rel.is_active,
    )
    .map((rel) => rel.article_id);

  // 2. Фільтруємо статті
  const result = articles.filter((article) => relatedIds.includes(article.id));

  // 3. Сортуємо (нові зверху)
  return result.sort((a, b) => new Date(b.published) - new Date(a.published));
}

async function getArticlesByPersonId(entityId) {
  return await getArticlesByEntity({ entityId, entityType: "person" });
}

async function getArticlesByCompetitionId(entityId) {
  return await getArticlesByEntity({ entityId, entityType: "competition" });
}

export { getArticlesByEntity, getArticlesByPersonId };
