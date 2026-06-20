function getQueryParam(paramName) {
  const params = new URLSearchParams(window.location.search);

  return params.get(paramName);
}

function toggleSearchParam(key, value) {
  const url = new URL(window.location);

  const params = url.searchParams;

  // Отримуємо всі значення key
  const values = params.getAll(key);

  // Перевіряємо: чи value вже існує
  const hasValue = values.includes(value);

  if (hasValue) {
    // Видаляємо всі значення
    params.delete(key);

    // Повертаємо назад всі КРІМ current value
    values
      .filter((item) => item !== value)
      .forEach((item) => {
        params.append(key, item);
      });
  } else {
    // Додаємо новий value
    params.append(key, value);
  }

  window.history.pushState({}, "", url);
}

function updateOneSearchParam(key, value) {
  const url = new URL(window.location);

  if (!value) {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }

  window.history.pushState({}, "", url);
}

function updateSearchParams(url, key, value) {
  url.searchParams.delete(key);

  if (value === null) {
    return;
  }

  // const values = (Array.isArray(value) ? value : [value]).filter(Boolean);
  const values = (Array.isArray(value) ? value : [value]).filter(
    (item) => String(item).trim() !== "",
  );

  if (!values.length) {
    return;
  }

  values.forEach((v) => url.searchParams.append(key, v));
}

export {
  getQueryParam,
  toggleSearchParam,
  updateOneSearchParam,
  updateSearchParams,
};
