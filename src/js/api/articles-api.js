async function fetchArticles() {
  try {
    const response = await fetch("assets/data/articles.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch statuses: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching Articles:", error);
    return [];
  }
}

async function fetchAthleteArticleRelations() {
  try {
    const res = await fetch("assets/data/entity-article-relations.json");

    if (!res.ok) {
      throw new Error(`Failed to fetch statuses: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching entity-article relations:", error);
    return [];
  }
}

async function fetchArticleRelations() {
  try {
    const res = await fetch("assets/data/entity-article-relations.json");

    if (!res.ok) {
      throw new Error(`Failed to fetch statuses: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching entity-article relations:", error);
    return [];
  }
}

export { fetchArticles, fetchAthleteArticleRelations, fetchArticleRelations };
