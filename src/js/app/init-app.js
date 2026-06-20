import { initModules } from './init-modules.js';
import { initCurrentPage } from './init-page.js';

export function initApp() {
  initModules();
  initCurrentPage();
}
