import { buildAthleteBiography } from "./build-athlete-biography.js";
import { buildAthleteCoaching } from "./build-athlete-coaching.js";
import { buildAthleteEducationCareer } from "./build-athlete-education-career.js";
import { buildPersonalInformation } from "./build-athlete-personal-information.js";
import { buildAthletePersonalInterests } from "./build-athlete-personal-interests.js";
import { buildPhysicalMetrics } from "./build-athlete-physical-metrics.js";
import { buildAthleteSportsInformation } from "./build-athlete-sports-information.js";

function buildAthleteInfoTab(athlete) {
  const { hobbies } = athlete;

  const leftColumnSections = [
    buildAthleteSportsInformation(athlete),
    buildAthleteCoaching(athlete),
    buildPhysicalMetrics(athlete),
  ].filter(Boolean);

  const rightColumnSections = [
    buildPersonalInformation(athlete),
    buildAthleteEducationCareer(athlete),
    buildAthletePersonalInterests(athlete),
  ];

  const leftColumn = leftColumnSections.length
    ? `<div class="athlete-info__column">${leftColumnSections.join("")}</div>`
    : "";

  const rightColumn = rightColumnSections.length
    ? `<div class="athlete-info__column">${rightColumnSections.join("")}</div>`
    : "";

  const athleteBio = buildAthleteBiography(athlete.athlete_profile?.biography);

  return `<!-- Athlete Details Section -->
<section class="athlete-info__details">
  <!-- LEFT COLUMN -->
  ${leftColumn}

  <!-- RIGHT COLUMN -->
  ${rightColumn}
  <!-- <div class="athlete-info__column"> -->
    <!-- Personal Information -->
    <!-- {{> layouts/pages/athlete/info-tab/personal-information }} -->

    <!-- Education & Career -->
    <!-- {{> layouts/pages/athlete/info-tab/education-career }} -->

    <!-- Personal Interests -->
    <!-- {{> layouts/pages/athlete/info-tab/personal-interests }} -->
  <!-- </div> -->
</section>

${athleteBio ? athleteBio : ""}
  `;
}

export { buildAthleteInfoTab };
