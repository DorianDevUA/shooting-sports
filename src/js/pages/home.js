import { createSwiperAthleteCardList } from "../templates/athletes/athlete-card-swiper.js";
import { createSwiperCompetitionCardList } from "../templates/competitions/competition-card-swiper.js";
import { createSwiperNewsCardList } from "../templates/news/news-card-swiper.js";
import { fetchAthletes } from "../api/athletes-api.js";
import { fetchArticles } from "../api/articles-api.js";
import { fetchCompetitions } from "../api/competitions-api.js";
import { initHeroSlider } from "../modules/sliders/hero-slider/hero-slider.js";
import { initTeamSlider } from "../modules/sliders/team-slider/team-slider.js";
import { initDisciplinesSlider } from "../modules/sliders/disciplines-slider/disciplines-slider.js";
import { initCompetitionsSlider } from "../modules/sliders/competitions-slider/competitions-slider.js";
import { initRankingSlider } from "../modules/sliders/ranking-slider/ranking-slider.js";
import { initNewsSlider } from "../modules/sliders/news-slider/news-slider.js";
import { initPartnersSlider } from "../modules/sliders/partners-slider/partners-slider.js";

const refs = {
  athleteList: document.querySelector(".js-team-list"),
  competitionList: document.querySelector(".js-competition-list"),
  newsList: document.querySelector(".js-news-list"),
  partnerList: document.querySelector(".js-partner-list"),
};

// const athletes = await fetchAthletes();
// const articles = await fetchArticles();
// const sortedNews = articles
//   .slice() // щоб не мутувати оригінал
//   .sort((a, b) => new Date(b.published) - new Date(a.published));

// console.log(sortedNews);

export async function initHomePage() {
  console.log("Home page init");

  try {
    const [athletes, competitions, articles] = await Promise.all([
      fetchAthletes(),
      fetchCompetitions(),
      fetchArticles(),
    ]);
    const sortedNews = articles
      .slice() // щоб не мутувати оригінал
      .sort((a, b) => new Date(b.published) - new Date(a.published));

    refs.athleteList.innerHTML = createSwiperAthleteCardList(athletes);
    refs.competitionList.innerHTML =
      createSwiperCompetitionCardList(competitions);
    refs.newsList.innerHTML = createSwiperNewsCardList(sortedNews);

    initHeroSlider();
    initTeamSlider();
    initDisciplinesSlider();
    initCompetitionsSlider();
    initRankingSlider();
    initNewsSlider();
    initPartnersSlider();
  } catch (error) {
    console.error("❌ Home page init failed:", error);
  }
}
