import { initLayoutVars } from "../modules/layout-vars.js";
import { initMobileMenu } from "../modules/mobile-menu/mobile-menu.js";
import { initModal } from "../modules/modal/modal.js";
import { initNavigation } from "../modules/navigation/navigation.js";
import { initTabs } from "../modules/tabs/tabs.js";
import { initAccordion } from "../modules/accordion/accordion.js";

export function initModules() {
  initLayoutVars();
  initMobileMenu();
  initNavigation();
  initModal();
  initTabs();
  initAccordion();
}
