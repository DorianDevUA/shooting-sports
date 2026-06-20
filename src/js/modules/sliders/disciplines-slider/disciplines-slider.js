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
    el: ".disciplines-slider__pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".disciplines-slider__btn-next",
    prevEl: ".disciplines-slider__btn-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 3,
    },
  },
};

export function initDisciplinesSlider() {
  // Initialize swiper instance
  const swiper = new Swiper(".disciplines-slider__wrapper", sliderOptions);
}
