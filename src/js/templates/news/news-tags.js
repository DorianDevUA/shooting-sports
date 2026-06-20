const TAG_COLOR_MAP = {
  azerbaijan: "tags__link--aze",
  spain: "tags__link--esp",
  issf: "tags__link--blue",
  asf: "tags__link--green",
  gold_medal: "tags__link--gold",
  winner: "tags__link--orange",
};

function createTagList(tags) {
  return tags
    .map((tag) => {
      const colorClass = TAG_COLOR_MAP[tag.id] ?? "tags__link--default";

      return `
        <li class="tags__item">
          <a class="tags__link ${colorClass}" href="news/?tag=${tag.slug}">
            ${tag.name}
          </a>
        </li>
      `;
    })
    .join("");
}

function renderTags(tags) {
  if (!tags || !tags.length) {
    return "";
  }

  return `
  <div class="news-card__tags tags">
    <ul class="tags__list">
      ${createTagList(tags)}
    </ul>
  </div>
  `;
}

export { renderTags };
