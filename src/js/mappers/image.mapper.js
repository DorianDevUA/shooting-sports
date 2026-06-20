/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */
function portraitDTO(portrait) {
  if (!portrait) {
    return null;
  }

  return {
    url: portrait.url,
    alt: portrait.alt,
    width: portrait.width,
    height: portrait.height,
  };
}

function coverDTO(cover) {
  if (!cover) {
    return null;
  }

  return {
    url: cover.url,
    alt: cover.alt,
    width: cover.width,
    height: cover.height,
  };
}

export { portraitDTO, coverDTO };
