function normalizeString(str) {
  return str.toLowerCase().trim();
}

function slugify(string, delimiter = "-") {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, delimiter)
    .replace(new RegExp(`${delimiter}+`, "g"), delimiter)
    .replace(new RegExp(`^${delimiter}|${delimiter}$`, "g"), "");
}

export { normalizeString, slugify };
