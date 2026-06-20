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
  //   el: ".js-pagination-competition-news",
  //   clickable: true,
  //   dynamicBullets: true,
  // },

  // Navigation arrows
  navigation: {
    prevEl: ".js-prev-competition-news",
    nextEl: ".js-next-competition-news",
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

export function initCompNewsSlider() {
  // Initialize swiper instance
  const swiper = new Swiper(".js-slider-competition-news", sliderOptions);
}
