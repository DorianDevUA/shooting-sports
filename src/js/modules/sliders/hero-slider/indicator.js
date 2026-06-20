import { heroSliderRefs } from "./refs";

// Update the indicator height and width
export function updateIndicator(tab, index) {
  heroSliderRefs.sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
  heroSliderRefs.sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;

  // Calculate the scroll position and scroll smoothly
  const scrollLeft =
    heroSliderRefs.sliderTabs[index].offsetLeft -
    heroSliderRefs.sliderControls.offsetWidth / 2 +
    heroSliderRefs.sliderTabs[index].offsetWidth / 2;

  heroSliderRefs.sliderControls.scrollTo({
    left: scrollLeft,
    behavior: "smooth",
  });
}
