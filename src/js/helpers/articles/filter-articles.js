function filterArticlesByCategory(articles, articleCategory) {
  return articles.filter((article) => article.category.id === articleCategory);
}

function filterArticles(articles, filters) {
  return articles.filter((article) => {
    const matchesCategory =
      !filters.category || article.category.id === filters.category;

    const matchesTag =
      !filters.tag || article.tags.some((tag) => tag.id === filters.tag);

    return matchesCategory && matchesTag;
  });
}

function getFilteredArticles(articles, filters) {
  // articles масив всіх статей(новин)
  // filters об'єкт з активними фільтрами
  // Наприклад:
  // {
  //   categories: ["results"],
  //   tags: ["gold_medal", "winner"]
  // }
  //
  // Перебираємо кожну статтю(новину) масиву articles
  // .filter() створює новий масив лише з тих елементів, для яких callback поверне true

  return articles.filter((article) => {
    // ================================
    // CATEGORY FILTER
    // ================================
    // Якщо categories порожній масив: filters.categories.length === 0
    // тоді: !0 -> true, а значить: стаття автоматично проходить category filter
    //
    // Якщо categories НЕ порожній:
    // перевіряємо: чи category.id статті є в масиві filters.categories
    const matchesCategory =
      !filters.categories.length ||
      filters.categories.includes(article.category.id);
    // ==========================================
    // Приклад
    // ==========================================
    // URL: /news/?category=results&category=interviews
    // filters.categories: ["results", "interviews"]
    // article.category.id: "results"
    // ["results", "interviews"].includes("results");    // true

    // ==================================================
    // TAG FILTER
    // ==================================================
    // Та сама логіка:
    // Якщо tags пустий масив: filters.tags.length === 0
    // тоді: !0 -> true, - новина автоматично проходить tag filter
    //
    // article.tags — масив тегів новини
    // some() перевіряє: чи хоча б ОДИН тег новини входить в filters.tags
    const matchesTag =
      !filters.tags.length ||
      article.tags.some((tag) => filters.tags.includes(tag.slug));
    // ==========================================
    // Приклад
    // ==========================================

    // URL: /news?tag=gold_medal&tag=winner
    // filters.tags: ["gold_medal", "winner"]
    // article.tags:
    // [
    //   { id: "issf", ... },
    //   { id: "winner", ... },
    // ]

    // some() перебирає article.tags
    // Перевірка №1: filters.tags.includes("issf")      // false
    // Перевірка №2: filters.tags.includes("winner")    // true
    // some() одразу повертає true

    // ==================================================
    // FINAL RESULT
    // ==================================================

    // Новина залишиться у фінальному масиві, лише якщо:
    // matchesCategory === true та matchesTag === true
    return matchesCategory && matchesTag;
  });
}

export { filterArticlesByCategory, getFilteredArticles };
