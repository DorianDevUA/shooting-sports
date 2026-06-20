import { formatLongDate } from "../../../utils/date.js";

function buildPersonalInformation(athlete) {
  const { nationality, date_of_birth, birth_place, hometown, marital_status } =
    athlete;

  const isPersonalInfoExist =
    nationality || date_of_birth || birth_place || hometown || marital_status;

  if (!isPersonalInfoExist) {
    return;
  }

  return `<section class="athlete-info-group">
  <header class="athlete-info-group__header">
    <h3 class="athlete-info-group__title">Personal Information</h3>
  </header>

  <ul class="athlete-info-list">
    ${
      nationality
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Nationality</span>

      <span class="athlete-info-list__value">${nationality.name}</span>
    </li>`
        : ""
    }

    ${
      date_of_birth
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Date of birth</span>

      <time class="athlete-info-list__value" datetime="${date_of_birth}">
        ${formatLongDate(date_of_birth)}
      </time>
    </li>`
        : ""
    }

    ${
      birth_place
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Place of birth</span>

      <span class="athlete-info-list__value">${birth_place.name}, ${birth_place.country.name}</span>
    </li>`
        : ""
    }

    ${
      hometown
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Hometown</span>

      <span class="athlete-info-list__value">${hometown.name}, ${hometown.country.name}</span>
    </li>`
        : ""
    }

    ${
      marital_status
        ? `<li class="athlete-info-list__item">
      <span class="athlete-info-list__label">Marital status</span>

      <span class="athlete-info-list__value">${marital_status.name}</span>
    </li>`
        : ""
    }
  </ul>
</section>
`;
}

export { buildPersonalInformation };
