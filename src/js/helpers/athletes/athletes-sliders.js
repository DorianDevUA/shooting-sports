import { DISCIPLINES } from "../../constants/ui.js";
import { filterAthletesByDiscipline } from "./filter-athletes.js";
import { initPistolTeamSlider } from "../../modules/sliders/athletes/slider-pistol-team.js";
import { initRifleTeamSlider } from "../../modules/sliders/athletes/slider-rifle-team.js";
import { initSkeetTeamSlider } from "../../modules/sliders/athletes/slider-skeet-team.js";
import { initTrapTeamSlider } from "../../modules/sliders/athletes/slider-trap-team.js";
import { createSwiperAthleteCardList } from "../../templates/athletes/athlete-card-swiper.js";

const refs = {
  pistolSlider: document.querySelector(".js-list-pistol-team"),
  rifleSlider: document.querySelector(".js-list-rifle-team"),
  skeetSlider: document.querySelector(".js-list-skeet-team"),
  trapSlider: document.querySelector(".js-list-trap-team"),
};

const sliders = [
  {
    discipline: DISCIPLINES.PISTOL,
    container: refs.pistolSlider,
    initSlider: initPistolTeamSlider,
  },

  {
    discipline: DISCIPLINES.RIFLE,
    container: refs.rifleSlider,
    initSlider: initRifleTeamSlider,
  },

  {
    discipline: DISCIPLINES.SKEET,
    container: refs.skeetSlider,
    initSlider: initSkeetTeamSlider,
  },

  {
    discipline: DISCIPLINES.TRAP,
    container: refs.trapSlider,
    initSlider: initTrapTeamSlider,
  },
];

function initAthletesSliders(athletes) {
  sliders.forEach(({ discipline, container, initSlider }) => {
    const filteredAthletes = filterAthletesByDiscipline(athletes, discipline);

    container.innerHTML = createSwiperAthleteCardList(filteredAthletes);

    initSlider();
  });
}

// function initAthletesSliders(athletes) {
//   const pistolTeam = filterAthletesByDiscipline(athletes, DISCIPLINES.PISTOL);
//   const rifleTeam = filterAthletesByDiscipline(athletes, DISCIPLINES.RIFLE);
//   const skeetTeam = filterAthletesByDiscipline(athletes, DISCIPLINES.SKEET);
//   const trapTeam = filterAthletesByDiscipline(athletes, DISCIPLINES.TRAP);

//   refs.pistolSlider.innerHTML = createSwiperAthleteCardList(pistolTeam);
//   initPistolTeamSlider();

//   refs.rifleSlider.innerHTML = createSwiperAthleteCardList(rifleTeam);
//   initRifleTeamSlider();

//   refs.skeetSlider.innerHTML = createSwiperAthleteCardList(skeetTeam);
//   initSkeetTeamSlider();

//   refs.trapSlider.innerHTML = createSwiperAthleteCardList(trapTeam);
//   initTrapTeamSlider();
// }

export { initAthletesSliders };
