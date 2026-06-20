// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";

const sliderOptions = {
  slidesPerView: 2,
  spaceBetween: 20,
  // loop: true,

  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  //   pauseOnMouseEnter: true,
  // },

  // Pagination
  pagination: {
    el: ".partners-slider__pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".partners-slider__btn-next",
    prevEl: ".partners-slider__btn-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    576: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
    1280: {
      slidesPerView: 6,
    },
    1440: {
      slidesPerView: 7,
    },
  },
};

export function initPartnersSlider() {
  // Initialize swiper instance
  const swiper = new Swiper(".partners-slider__wrapper", sliderOptions);
}
