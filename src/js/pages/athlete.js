import { fetchAthletes } from "../api/athletes-api.js";
import { fetchAthleteArticleRelations } from "../api/articles-api.js";
import { getArticlesByPersonId } from "../services/article-service.js";
import { renderAthleteProfile } from "../templates/athlete/athlete-profile/athlete-profile.js";
import { buildAthleteInfoTab } from "../templates/athlete/athlete-info-tab/build-athlete-info-tab.js";
import {
  createArticlesSwiper,
  createSwiperNewsCardList,
} from "../templates/news/news-card-swiper.js";
import { initArticlesSlider } from "../modules/sliders/articles-slider/articles-slider.js";

export async function initAthletePage() {
  console.log("init Athlete Page");

  const refs = {
    newsTab: document.querySelector('button[data-tab="news"]'),
    newsPanel: document.querySelector('section[data-tab="news"]'),
    infoTab: document.querySelector('section[data-tab="info"]'),
  };

  const [athletes, articleRels] = await Promise.all([
    fetchAthletes(),
    fetchAthleteArticleRelations(),
  ]);

  const slug = getAthleteSlugFromURL();
  // console.log("Athlete slug:", slug);

  const athlete = athletes.find((ath) => ath.slug === slug);

  if (!athlete) {
    console.log(`Athlete with slug:${slug} not found in the Database`);
    // redirectTo404();
    return;
  }

  renderAthletePage(athlete);

  // Знаходимо пов'язані з атлетом новини
  const articles = await getArticlesByPersonId(athlete.id);

  if (articles.length) {
    refs.newsPanel.innerHTML = createArticlesSwiper(articles);
    initArticlesSlider();
  } else {
    refs.newsTab.hidden = true;
  }
}

/**
 * Отримує athlete.slug з page URL
 *
 * window.location.pathname
 *
 * /athletes/lunev-ruslan/ → lunev-ruslan
 */
function getAthleteSlugFromURL() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  // console.log("SlugFrom getAthleteSlugFromURL:", parts[parts.length - 1]);
  // console.log("Parts:", parts);

  return parts[parts.length - 1].trim().toLocaleLowerCase();
  // ["athletes", "lunev-ruslan"]
}

/**
 * Редірект на сторінку /404.html
 */
// function redirectTo404() {
//   window.location.href = "/404.html";
// }

// Рендер сторінки
function renderAthletePage(athlete) {
  const profileContainer = document.querySelector("section[data-profile]");
  const infoTab = document.querySelector('section[data-tab="info"]');

  const sportsInfo = infoTab.querySelector(".js-sports-info");
  const personalInfo = infoTab.querySelector(".js-personal-info");
  const coaching = infoTab.querySelector(".js-coaching");
  const physicalMetrics = infoTab.querySelector(".js-physical-metrics");
  const educationCareer = infoTab.querySelector(".js-education-career");
  const personalInterests = infoTab.querySelector(".js-personal-interests");
  const athleteBio = infoTab.querySelector(".js-athlete-bio");

  if (!profileContainer) {
    console.error("❌ Data attribute data-profile not found");
    return;
  }

  if (!infoTab) {
    console.error('❌ Data attribute data-tab="info" not found');
    return;
  }

  profileContainer.insertAdjacentHTML(
    "beforeend",
    renderAthleteProfile(athlete),
  );

  // infoTab.innerHTML = "Haha";
  infoTab.innerHTML = buildAthleteInfoTab(athlete);
}

// function renderAthleteInfoTab(athlete) {
//   return `
//   <div class="athlete-info-tab__layout">
//   <!-- LEFT COLUMN -->
//   <div class="athlete-info-tab__column">
//     <!-- Personal Information -->
//     <section class="athlete-info-section">
//       <header class="athlete-info-section__header">
//         <h3 class="athlete-info-section__title">Personal Information</h3>
//       </header>

//       <ul class="athlete-info-list">
//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Full name </span>

//           <span class="athlete-info-list__value"> Ruslan LUNEV </span>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Date of birth </span>

//           <time class="athlete-info-list__value" datetime="1989-07-25">
//             25 July 1989
//           </time>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Place of birth </span>

//           <span class="athlete-info-list__value"> Baku, Azerbaijan </span>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Residence </span>

//           <span class="athlete-info-list__value"> Baku, Azerbaijan </span>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Nationality </span>

//           <span class="athlete-info-list__value"> Azerbaijani </span>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Marital status </span>

//           <span class="athlete-info-list__value"> Single </span>
//         </li>
//       </ul>
//     </section>

//     <!-- Sports Information -->
//     <section class="athlete-info-section">
//       <header class="athlete-info-section__header">
//         <h3 class="athlete-info-section__title">Sports Information</h3>
//       </header>

//       <ul class="athlete-info-list">
//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Discipline </span>

//           <span class="athlete-info-list__value"> Pistol </span>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Events </span>

//           <div class="athlete-info-list__value">
//             <ul class="athlete-events-list">
//               <li class="athlete-events-list__item">
//                 <a class="athlete-events-list__link" href="#"> AP60 </a>
//               </li>

//               <li class="athlete-events-list__item">
//                 <a class="athlete-events-list__link" href="#"> RFPM </a>
//               </li>

//               <li class="athlete-events-list__item">
//                 <a class="athlete-events-list__link" href="#"> STP </a>
//               </li>
//             </ul>
//           </div>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Club </span>

//           <span class="athlete-info-list__value"> Neftchi </span>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Start of competing </span>

//           <span class="athlete-info-list__value"> 2006 </span>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label">
//             Practising shooting since
//           </span>

//           <span class="athlete-info-list__value"> 2002 </span>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Dominant hand </span>

//           <span class="athlete-info-list__value"> Right </span>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Master eye </span>

//           <span class="athlete-info-list__value"> Right </span>
//         </li>
//       </ul>
//     </section>
//   </div>

//   <!-- RIGHT COLUMN -->
//   <div class="athlete-info-tab__column">
//     <!-- Coaching -->
//     <section class="athlete-info-section">
//       <header class="athlete-info-section__header">
//         <h3 class="athlete-info-section__title">Coaching</h3>
//       </header>

//       <ul class="athlete-info-list">
//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Personal coach </span>

//           <span class="athlete-info-list__value"> Vladimir Lunev </span>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> National coach </span>

//           <span class="athlete-info-list__value"> Vladimir Lunev </span>
//         </li>
//       </ul>
//     </section>

//     <!-- Education & Career -->
//     <section class="athlete-info-section">
//       <header class="athlete-info-section__header">
//         <h3 class="athlete-info-section__title">Education & Career</h3>
//       </header>

//       <ul class="athlete-info-list">
//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Profession </span>

//           <span class="athlete-info-list__value"> Athlete </span>
//         </li>

//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Higher education </span>

//           <span class="athlete-info-list__value">
//             Masters degree sports academy
//           </span>
//         </li>
//       </ul>
//     </section>

//     <!-- Personal Interests -->
//     <section class="athlete-info-section">
//       <header class="athlete-info-section__header">
//         <h3 class="athlete-info-section__title">Personal Interests</h3>
//       </header>

//       <ul class="athlete-info-list">
//         <li class="athlete-info-list__item">
//           <span class="athlete-info-list__label"> Hobbies </span>

//           <span class="athlete-info-list__value">
//             Internet, reading, chess
//           </span>
//         </li>
//       </ul>
//     </section>

//     <!-- Biography -->
//     <section class="athlete-info-section athlete-biography">
//       <header class="athlete-info-section__header">
//         <h3 class="athlete-info-section__title">Biography</h3>
//       </header>

//       <div class="athlete-biography__content">
//         <!--
//             Довільний HTML з біографії атлета.
//             Вставляється через innerHTML.
//           -->

//         <p>
//           Ruslan Lunev is an Azerbaijani sport shooter specializing in pistol
//           disciplines.
//         </p>

//         <p>
//           He represented Azerbaijan at numerous international competitions
//           including ISSF World Cups and European Championships.
//         </p>
//       </div>
//     </section>
//   </div>
// </div>`;
// }
