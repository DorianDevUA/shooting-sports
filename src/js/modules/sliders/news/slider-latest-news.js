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
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // Pagination
  pagination: {
    el: ".js-pagination-latest-news",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    prevEl: ".js-prev-latest-news",
    nextEl: ".js-next-latest-news",
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

export function initLtstNewsSlider() {
  // Initialize swiper instance
  const swiper = new Swiper(".js-slider-latest-news", sliderOptions);
}
