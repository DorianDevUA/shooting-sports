import { fetchCompetitions } from "../api/competitions-api.js";
import { getPageSlugFromURL } from "../utils/url.js";

export async function initCompetitionPage() {
  console.log("Competition page init");

  const competitions = await fetchCompetitions();
  const pageSlug = getPageSlugFromURL();

  const competition = competitions.find(
    (competition) => competition.slug === pageSlug,
  );

  console.log("Competition", competition);

  renderEventsTable(competition.events);

  // Так как данные приходят плоским списком, их нужно сгруппировать по discipline.id и распределить галочки (*) по гендерам (male, female, mixed).
  // Функция для отрисовки таблицы по конкретной категории (например, 'pistol' или 'rifle')
  function renderEventsTable(events) {
    const tbody = document.getElementById("events-table-rows");

    // Шаг 1: Групуємо дані спочатку за Категорією (Category), потім за Дисципліною (Discipline)
    const structuredData = {};

    events.forEach((item) => {
      const discipline = item.event.discipline;
      const category = item.event.discipline.category;
      const gender = item.event.gender.id;

      // Створюємо категорію, якщо її ще немає (напр. rifle)
      if (!structuredData[category.id]) {
        structuredData[category.id] = {
          name: category.name, // Назва для відображення (Rifle)
          disciplines: {},
        };
      }

      // Створюємо дисципліну всередині категорії (напр. 10m Air Rifle)
      if (!structuredData[category.id].disciplines[discipline.id]) {
        structuredData[category.id].disciplines[discipline.id] = {
          id: discipline.id,
          name: discipline.name,
          men: false,
          women: false,
          mixed: false,
        };
      }

      // Відмічаємо наявність змагання
      const currentDisc =
        structuredData[category.id].disciplines[discipline.id];

      if (gender === "male") {
        currentDisc.men = true;
      }
      if (gender === "female") {
        currentDisc.women = true;
      }
      if (gender === "mixed") {
        currentDisc.mixed = true;
      }
    });

    // Шаг 2: Генеруємо HTML на основі згрупованих даних
    let html = "";

    Object.values(structuredData).forEach((category) => {
      // Додаємо рядок-заголовок категорії (PISTOL, RIFLE тощо) на всю ширину (colspan="4")
      html += `
      <tr class="events-table__row events-table__row--category">
        <td class="events-table__cell events-table__cell--header">${category.name}</td>
        <td class="events-table__cell events-table__cell--header">Men</td>
        <td class="events-table__cell events-table__cell--header">Women</td>
        <td class="events-table__cell events-table__cell--header">Mixed</td>
      </tr>
    `;

      // Додаємо рядки дисциплін цієї категорії
      Object.values(category.disciplines).forEach((disc) => {
        html += `
        <tr class="events-table__row">
          <td class="events-table__cell events-table__cell--discipline">
            <a class="" href="disciplines/?discipline=${disc.id}" target="_blank">
              ${disc.name}
            </a>
          </td>
          <td class="events-table__cell events-table__cell--status">${disc.men ? "★" : ""}</td>
          <td class="events-table__cell events-table__cell--status">${disc.women ? "★" : ""}</td>
          <td class="events-table__cell events-table__cell--status">${disc.mixed ? "★" : ""}</td>
        </tr>
      `;
      });
    });

    tbody.innerHTML = html;
  }
}
