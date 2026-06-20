import { formatDate, calculateAge } from "../../../utils/date.js";

function renderAthleteProfile(athlete) {
  const {
    slug,
    full_name,
    date_of_birth,
    profile,
    sport_grade,
    handedness,
    dominant_eye,
    occupation,
    gender,
    roles,
    primary_club,
    other_clubs,
    country,
    residence,
    main_discipline,
    events,
    test,
    images: { portrait },
    coaches,
  } = athlete;

  const age = calculateAge(date_of_birth);

  return `<div class="container profile">
  <!-- TOP LAYOUT (2 columns) -->
  <div class="athlete-profile__layout">
    <!-- ◀ LEFT COLUMN -->
    <div class="athlete-profile__aside">
      <!-- Profile Media -->
      <div class="athlete-profile__media">
        <img
            class="athlete-profile__portrait"
            src="${portrait ? portrait?.url : "assets/images/athletes/defaults/avatar.png"}"
            alt="${portrait?.alt ?? `Portrait of ${full_name}`}"
            width="${portrait?.width ?? 300}"
          />
      </div>
    </div>

    <!-- RIGHT COLUMN ▶ -->
    <div class="athlete-profile__main">
      <!-- Profile Header -->
      <div class="athlete-profile__header">
        <h2 class="athlete-profile__name">${full_name}</h2>
      </div>

      <!-- Profile Info -->
      <ul class="athlete-profile__info">

        <!-- Profile Gender -->
        ${
          gender
            ? `<li class="athlete-profile__info-row">
          <div class="athlete-profile__info-key">Gender:</div>
          <span class="athlete-profile__info-value">${gender.name}</span>
        </li>`
            : ""
        }

        <!-- Profile Age -->
        ${
          date_of_birth
            ? `<li class="athlete-profile__info-row">
          <div class="athlete-profile__info-key">Age:</div>
          <span class="athlete-profile__info-value">${age} years</span>
        </li>`
            : ""
        }

        <!-- Profile Main Discipline -->
        ${
          main_discipline
            ? `<li class="athlete-profile__info-row">
          <div class="athlete-profile__info-key">Discipline:</div>
          <span class="athlete-profile__info-value">${main_discipline.name}</span>
        </li>`
            : ""
        }

        <!-- Profile Clubs -->
        ${
          primary_club
            ? `<li class="athlete-profile__info-row">
          <div class="athlete-profile__info-key">Club:</div>
          <span class="athlete-profile__info-value">${primary_club.acronym} (${primary_club.name})</span>
        </li>`
            : ""
        }

        <!-- Profile Sport Grade -->
        ${
          sport_grade
            ? `<li class="athlete-profile__info-row">
          <div class="athlete-profile__info-key">Sport Grade:</div>
          <span class="athlete-profile__info-value">${sport_grade.short_name} (${sport_grade.name})</span>
        </li>`
            : ""
        }

        <!-- Profile Events -->
        <!-- ${
          events.length
            ? `<li class="athlete-profile__info-row">
          <div class="athlete-profile__info-key">Events:</div>
          <div class="athlete-profile__info-value">
            <ul class="athlete-profile__events">
              ${buildAthleteEvents(events)}
            </ul>
          </div>
        </li>`
            : ""
        } -->

        <!-- Profile Height -->
        <!-- ${
          profile?.height
            ? `<li class="athlete-profile__info-row">
          <div class="athlete-profile__info-key">Height:</div>
          <span class="athlete-profile__info-value">${profile.height} cm</span>
        </li>`
            : ""
        } -->

        <!-- Profile Weight -->
        <!-- ${
          profile?.weight
            ? `<li class="athlete-profile__info-row">
          <div class="athlete-profile__info-key">Weight:</div>
          <span class="athlete-profile__info-value">${profile.weight} kg</span>
        </li>`
            : ""
        } -->

        <!-- Profile Roles -->
        <!-- ${
          roles
            ? `<li class="athlete-profile__info-row">
          <div class="athlete-profile__info-key">Roles:</div>
          <span class="athlete-profile__info-value">${roles.map((r) => `${r.name}`).join(", ")}</span>
        </li>`
            : ""
        } -->

        <!-- Profile Status -->
        <!-- ${
          status
            ? `<li class="athlete-profile__info-row">
          <div class="athlete-profile__info-key">Status:</div>
          <span class="athlete-profile__info-value">Active</span>
        </li>`
            : ""
        } -->

        <!-- Profile Residence -->
        ${
          residence
            ? `<li class="athlete-profile__info-row">
          <div class="athlete-profile__info-key">Residence:</div>
          <span class="athlete-profile__info-value">${residence.name}, ${residence.country.name}</span>
        </li>`
            : ""
        }

      </ul>
    </div>
  </div>
</div>`;
}

/**
 * Генерує Events для секції profile сторінки athlete
 */
function buildAthleteEvents(events) {
  // console.log("eventList:", events);
  return events
    .map(
      (e) => `<li class="athlete-profile__events-item" data-event="${e.id}">
  <a class="athlete-profile__events-link" href="disciplines/${e.discipline.slug}/">${e.code}</a>
</li>`,
    )
    .join("");
}

export { renderAthleteProfile };
