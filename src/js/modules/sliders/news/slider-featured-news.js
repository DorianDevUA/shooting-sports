// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";

const sliderOptions = {
  slidesPerView: 1,
  speed: 600,
  loop: true,

  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },

  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // Pagination
  pagination: {
    el: ".js-pagination-featured-news",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    prevEl: ".js-prev-featured-news",
    nextEl: ".js-next-featured-news",
  },

  // Responsive breakpoints
  // breakpoints: {
  //   576: {
  //     slidesPerView: 2,
  //   },
  //   1024: {
  //     slidesPerView: 3,
  //   },
  //   1440: {
  //     slidesPerView: 4,
  //   },
  // },
};

function initFeaturedNewsSlider() {
  // Initialize swiper instance
  const swiper = new Swiper(".js-slider-featured-news", sliderOptions);
}

export { initFeaturedNewsSlider };
