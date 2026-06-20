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
  pagination: {
    el: ".competitions-slider__pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".competitions-slider__btn-next",
    prevEl: ".competitions-slider__btn-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 4,
    },
  },
};

export function initCompetitionsSlider() {
  // Initialize swiper instance
  const swiper = new Swiper(".competitions-slider__wrapper", sliderOptions);
}
