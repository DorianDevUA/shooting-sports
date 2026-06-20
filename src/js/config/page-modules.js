import { initHomePage } from "../pages/home.js";
import { initAboutUsPage } from "../pages/about-us.js";
import { initCompetitionsPage } from "../pages/competitions.js";
import { initDisciplinesPage } from "../pages/disciplines.js";
import { initAthletesPage } from "../pages/athletes.js";
import { initAthletePage } from "../pages/athlete.js";
import { initResultsPage } from "../pages/results.js";
import { initNewsPage } from "../pages/news.js";
import { initGlleryPage } from "../pages/gallery.js";
import { initContactsPage } from "../pages/contacts.js";
import { initArticlePage } from "../pages/article.js";
import { initCompetitionPage } from "../pages/competition.js";

export const pageModules = {
  home_page: initHomePage,
  about_us: initAboutUsPage,
  competitions: initCompetitionsPage,
  disciplines: initDisciplinesPage,
  athletes: initAthletesPage,
  results: initResultsPage,
  news: initNewsPage,
  gallery: initGlleryPage,
  contacts: initContactsPage,
  athlete: initAthletePage,
  competition: initCompetitionPage,
  article: initArticlePage,
};
