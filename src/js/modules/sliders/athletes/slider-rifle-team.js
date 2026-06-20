// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";

const sliderOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 600,
  loop: true,

  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // Pagination
  // pagination: {
  //   el: ".js-pagination-rifle-team",
  //   clickable: true,
  //   dynamicBullets: true,
  // },

  // Navigation arrows
  navigation: {
    prevEl: ".js-prev-rifle-team",
    nextEl: ".js-next-rifle-team",
  },

  // Responsive breakpoints
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1440: {
      slidesPerView: 5,
    },
  },
};

function initRifleTeamSlider() {
  // Initialize swiper instance
  return new Swiper(".js-slider-rifle-team", sliderOptions);
}

export { initRifleTeamSlider };
