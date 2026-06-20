// Формат DD.MM.YYYY → 21.05.2024
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("uk-UA");
};

// Формат DD MMM → 26 Jul
/**
 * Форматує рядок дати у короткий вигляд "DD MMM" (наприклад, "24 Apr").
 *
 * @param {string | number | Date} dateStr - Вхідна дата (рядок, timestamp або об'єкт Date).
 * @returns {string} Відформатована дата у форматі "день місяць".
 *
 * @example
 * formatShortDate("2026-04-24"); // Поверне "24 Apr"
 */
function formatShortDate(dateStr) {
  const date = new Date(dateStr);
  const [day, month, year] = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .split(" ");

  return `${day} ${month}`;
}

// Формат DD MMM YYYY → 05 Aug 2024
/**
 * Форматує рядок дати у вигляд "DD MMM, YYYY" (наприклад, "24 Apr, 2026").
 *
 * @param {string | number | Date} dateStr - Вхідна дата (рядок, timestamp або об'єкт Date).
 * @returns {string} Відформатована дата у форматі "день місяць, рік".
 *
 * @example
 * formatLongDate("2026-04-24"); // Поверне "24 Apr, 2026"
 */
function formatLongDate(dateStr) {
  const date = new Date(dateStr);
  const [day, month, year] = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .split(" ");

  return `${day} ${month}, ${year}`;
}

function formatDateRange(startDate, endDate) {
  return `${formatShortDate(startDate)} - ${formatLongDate(endDate)}`;
}

/**
 * Calculate age from birth date
 *
 * @param {string} dateOfBirth - Date in format YYYY-MM-DD
 * @returns {number|null} Age in years
 */
function calculateAge(dateOfBirth) {
  // Якщо дата відсутня
  if (!dateOfBirth) {
    return null;
  }

  // 1. Convert string to Date
  const birthDate = new Date(dateOfBirth);

  // 2. Current date
  const currentDate = new Date();

  // 3. Get years
  const currentYear = currentDate.getFullYear();
  const birthYear = birthDate.getFullYear();

  // 4. Base age difference
  let age = currentYear - birthYear;

  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();

  const currentDay = currentDate.getDate();
  const birthDay = birthDate.getDate();

  const birthdayNotPassed =
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay);

  if (birthdayNotPassed) {
    age -= 1;
  }

  return age;
}

export {
  formatDate,
  formatShortDate,
  formatLongDate,
  formatDateRange,
  calculateAge,
};
