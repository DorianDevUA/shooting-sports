// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";
import { updateIndicator } from "./indicator.js";
import { heroSliderRefs } from "./refs.js";

export function initHeroSlider() {
  const heroSliderOptions = {
    effect: "fade",
    speed: 1300,
    autoplay: {
      delay: 8000,
    },
    navigation: {
      prevEl: "#hero-slide-prev",
      nextEl: "#hero-slide-next",
    },
    on: {
      // Update the indicator on slide change
      slideChange: () => {
        const currentTabIndex = [...heroSliderRefs.sliderTabs].indexOf(
          heroSliderRefs.sliderTabs[swiper.activeIndex],
        );
        updateIndicator(
          heroSliderRefs.sliderTabs[swiper.activeIndex],
          currentTabIndex,
        );
      },
      // Disable autoplay once the slide reaches the end
      reachEnd: () => swiper.autoplay.stop(),
    },
  };

  // Initialize swiper instance
  const swiper = new Swiper(".hero-slider-container", heroSliderOptions);

  // Update the slide and pagination on tab click
  heroSliderRefs.sliderTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      swiper.slideTo(index);
      updateIndicator(tab, index);
    });
  });

  updateIndicator(heroSliderRefs.sliderTabs[0], 0);

  // Update the indicator with the current slide
  window.addEventListener("resize", () =>
    updateIndicator(heroSliderRefs.sliderTabs[swiper.activeIndex], 0),
  );
}
