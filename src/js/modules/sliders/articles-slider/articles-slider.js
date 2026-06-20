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
    el: ".articles-slider__pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".articles-slider__btn-next",
    prevEl: ".articles-slider__btn-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    576: {
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

export function initArticlesSlider() {
  // Initialize swiper instance
  const swiper = new Swiper(".articles-slider__wrapper", sliderOptions);
}
