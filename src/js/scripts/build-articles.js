// =======================================
// build-articles.js
// Скрипт для генерації фінального articles.json
// з усіх source файлів та першорівневих сутностей
// =======================================

import fs from "fs";
import path from "path";

import { readJSON } from "../utils/fs.js";
import { arrayToMap } from "../utils/array.js";
import {
  resolve,
  resolveArticleCover,
  resolveTagsForEntity,
} from "../services/data-resolver.js";
import { coverDTO } from "../mappers/image.mapper.js";
import { categoryDTO, statusDTO } from "../mappers/article.mapper.js";
import { tagDTO } from "../mappers/tag.mapper.js";

// Папка з сирими даними
const SRC = "src/database/raw";
// Папка з довідниками (entities)
const ENTITIES = path.join(SRC, "entities");
const REFERENCE = path.join(SRC, "reference");
const RELATIONS = path.join(SRC, "relations");
// Папка для згенерованих файлів
const OUT = "src/database/generated";
const OUT_PUBLIC = "public/assets/data";

/**
 * Шлях до вхідного та вихідного файлу
 */
const paths = {
  articles: path.join(ENTITIES, "articles.json"),
  output: path.join(OUT_PUBLIC, "articles.json"),
};

/**
 *
 * Мапа усіх довідників.
 * Усі довідники, від яких залежать Athletes.
 * Сюди додаємо всі довідники, які будемо резолвити
 */
const dependencies = {
  media: path.join(ENTITIES, "media.json"),
  categories: path.join(REFERENCE, "article-categories.json"),
  statuses: path.join(REFERENCE, "article-statuses.json"),
  tags: path.join(REFERENCE, "tags.json"),
  tagGroups: path.join(REFERENCE, "tag-groups.json"),
  entityMediaRels: path.join(RELATIONS, "entity-media-relations.json"),
  entityTagRels: path.join(RELATIONS, "entity-tag-relations.json"),
  // сюди можна додати будь-які нові файли
};

// Будуємо вихідний файл
function buildArticles() {
  console.log("📄 Читаємо базові дані...");

  // 1️⃣ Завантажуємо всі довідники і робимо з них map
  /**
   * Мапа усіх довідників, від яких залежать Athletes.
   */
  const maps = {};

  for (const key in dependencies) {
    // Назва колекції(довідника) для деталізації тексту помилки
    const label = key[0].toUpperCase() + key.slice(1);

    maps[key] = arrayToMap(readJSON(dependencies[key]), label);
  }

  // 2️⃣ Парсимо базовий JSON файл і зберігаємо у змінну
  /**
   * Базовий вхідний масив з JSON файлу
   */
  const articlesBase = readJSON(paths.articles);

  // Парсимо массив зв'язків між сутностями та медиа-файлами.
  const entityMediaRels = readJSON(dependencies.entityMediaRels);
  const entityTagRels = readJSON(dependencies.entityTagRels);

  /**
   * 3️⃣ Валідація базових даних
   */
  for (const article of articlesBase) {
    if (!article.id) {
      throw new Error("❌ Article without id");
    }

    if (!article.category_id) {
      throw new Error(`❌ Article "${article.id}" missing category_id`);
    }

    if (!article.cover_media_id) {
      throw new Error(`❌ Article "${article.id}" missing cover_media_id`);
    }

    if (!article.title) {
      throw new Error(`❌ Article "${article.id}" missing article title`);
    }

    if (!article.excerpt) {
      throw new Error(`❌ Article "${article.id}" missing article excerpt`);
    }

    if (!article.content) {
      throw new Error(`❌ Article "${article.id}" missing article content`);
    }
  }

  /**
   * 4️⃣ Будуємо фінальний масив атлетів з резолвом залежностей
   */
  const articles = articlesBase.map((article) => {
    const category = resolve(
      maps.categories,
      article.category_id,
      "News category",
      article.id,
    );

    const status = resolve(
      maps.statuses,
      article.status_id,
      "Article status",
      article.id,
    );

    const cover = resolveArticleCover({
      mediaMap: maps.media,
      articleId: article.id,
      entityMedia: entityMediaRels,
    });

    const tags = resolveTagsForEntity({
      entityId: article.id,
      entityTypeId: "article",
      tagMap: maps.tags,
      tagGroupMap: maps.tagGroups,
      tagRelations: entityTagRels,
    });

    // Структура фінального об'єкта
    return {
      // Базові поля
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      published: article.published_at,

      // Resolved fields
      tags: tags.map(tagDTO),
      category: categoryDTO(category),
      status: statusDTO(status),

      media: {
        cover: coverDTO(cover),
      },
    };
  });

  /**
   * 5️⃣ Захищаємо від випадкових мутацій.
   */
  Object.freeze(articles);

  /**
   * 6️⃣ Гарантуємо, що папка generated існує.
   * Створюємо папку, якщо її ще немає
   */
  fs.mkdirSync(OUT, { recursive: true });

  // 7️⃣ Записуємо фінальний файл
  fs.writeFileSync(paths.output, JSON.stringify(articles, null, 2), "utf-8");

  console.log(`✅ Generated: ${articles.length} articles`);
  console.log(`✅ Saved to: ${paths.output}`);
}

// Запускаємо script
try {
  buildArticles();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
