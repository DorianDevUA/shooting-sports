import { pageModules } from "../config/page-modules.js";

export function initCurrentPage() {
  const currentPage = document.body.dataset.page;

  if (!currentPage) {
    console.error("Відсутній атрибут data-page на body");
    return;
  }

  const initPageFn = pageModules[currentPage];

  if (initPageFn) {
    initPageFn();
  }
}
