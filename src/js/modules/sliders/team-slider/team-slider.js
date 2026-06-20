// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";

const sliderOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // Pagination
  // pagination: {
  //   el: ".team-slider__pagination",
  //   clickable: true,
  //   dynamicBullets: true,
  // },

  // Navigation arrows
  navigation: {
    nextEl: ".team-slider__btn-next",
    prevEl: ".team-slider__btn-prev",
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

export function initTeamSlider() {
  // Initialize swiper instance
  const swiper = new Swiper(".team-slider__wrapper", sliderOptions);
}
