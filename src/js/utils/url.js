/**
 * Формирует нормализованный URL из базовой части и слага (slug).
 * Автоматически обрабатывает лишние слеши и гарантирует закрывающий слеш в конце.
 *
 * @param {string|null|undefined} base - Базовая часть URL (например, 'https://site.com/').
 * @param {string|null|undefined} slug - Относительный путь или идентификатор (например, '/my-page/').
 * @returns {string} Сформированный URL. Возвращает пустую строку, если входные данные отсутствуют.
 *
 * @example
 * buildUrl('http://api.com/', '/users/') // 'http://api.com/users/'
 * buildUrl(null, 'contacts')             // '/contacts/'
 * buildUrl('home', '')                   // 'home/'
 */
const buildUrl = (base, slug) => {
  if (!base && !slug) {
    return "";
  }

  const safeBase = (base || "").toString();
  const safeSlug = (slug || "").toString();

  // Удаляем слеши в конце базового пути
  const normalizedBase = safeBase.replace(/\/+$/, "");
  // Удаляем слеши в начале и в конце слага
  const normalizedSlug = safeSlug.replace(/^\/+|\/+$/g, "");

  if (!normalizedBase && !normalizedSlug) {
    return "";
  }

  if (!normalizedBase) {
    return `/${normalizedSlug}/`;
  }
  if (!normalizedSlug) {
    return `${normalizedBase}/`;
  }

  return `${normalizedBase}/${normalizedSlug}/`;
};

/**
 * Формирует абсолютный URL. Если путь уже содержит протокол (http/https),
 * он возвращается без изменений.
 *
 * @param {string|null|undefined} base - Базовая часть URL (домен).
 * @param {string|null|undefined} path - Путь или полный URL.
 * @returns {string} Результирующий абсолютный URL или пустая строка.
 *
 * @example
 * buildAbsUrl('https://site.com', 'api/v1')      // 'https://site.com'
 * buildAbsUrl('https://site.com', 'https://external.com') // 'https://external.com'
 * buildAbsUrl(null, 'profile')                   // '/profile'
 */
const buildAbsUrl = (base, path) => {
  if (!base && !path) {
    return "";
  }

  const safeBase = (base || "").toString();
  const safePath = (path || "").toString();

  if (!safeBase && !safePath) {
    return "";
  }

  // якщо path вже абсолютний URL — повертаємо як є
  if (/^https?:\/\//i.test(safePath)) {
    return safePath;
  }

  const normalizedBase = safeBase.replace(/\/+$/, "");
  const normalizedPath = safePath.replace(/^\/+/, "");

  // якщо є тільки base
  if (!normalizedPath && normalizedBase) {
    return `${normalizedBase}/`;
  }

  // якщо є тільки path
  if (!normalizedBase && normalizedPath) {
    return `/${normalizedPath}`;
  }

  // якщо є обидва
  if (normalizedBase && normalizedPath) {
    return `${normalizedBase}/${normalizedPath}`;
  }

  return "";
};

// Дістаємо page slug з page URL → window.location.pathname → /news/article-01/ → article-01
function getPageSlugFromURL() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1].trim().toLocaleLowerCase();
}

export { buildUrl, buildAbsUrl, getPageSlugFromURL };
