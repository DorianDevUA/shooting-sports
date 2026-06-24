/**
 * Accordion Component
 *
 * HTML API:
 *
 * .accordion
 * ├─ .accordion__item
 * │  ├─ .accordion__trigger
 * │  └─ .accordion__content
 *
 * Optional controls:
 * [data-accordion-expand]
 * [data-accordion-collapse]
 */

export function initAccordion(selector = ".accordion") {
  // Знаходимо всі акордеони на сторінці
  const accordions = document.querySelectorAll(selector);

  // Якщо нічого не знайдено — завершуємо роботу
  if (!accordions.length) {
    return;
  }

  // Ініціалізуємо кожен акордеон окремо
  accordions.forEach((accordion) => {
    const accordionItems = accordion.querySelectorAll(".accordion__item");

    if (!accordionItems.length) {
      return;
    }

    // Налаштовуємо початковий стан елементів
    initializeAccordionItems(accordionItems);

    // Один listener на весь акордеон
    accordion.addEventListener("click", (event) => {
      const accordionTrigger = event.target.closest(".accordion__trigger");

      // Клік по заголовку акордеона
      if (accordionTrigger) {
        const accordionItem = accordionTrigger.closest(".accordion__item");

        if (!accordionItem) {
          return;
        }

        toggleAccordionItem(accordionItem);

        return;
      }

      // Розгорнути всі
      const expandAllButton = event.target.closest("[data-accordion-expand]");

      if (expandAllButton) {
        accordionItems.forEach(expandAccordionItem);

        return;
      }

      // Згорнути всі
      const collapseAllButton = event.target.closest(
        "[data-accordion-collapse]",
      );

      if (collapseAllButton) {
        accordionItems.forEach(collapseAccordionItem);
      }
    });
  });
}

/**
 * Встановлює початковий стан елементів акордеона
 *
 * Expanded items: -> height = auto
 *
 * Collapsed items: -> height = 0
 */
function initializeAccordionItems(accordionItems) {
  accordionItems.forEach((accordionItem) => {
    const accordionContent = accordionItem.querySelector(".accordion__content");

    if (!accordionContent) {
      return;
    }

    accordionContent.style.overflow = "hidden";

    // Якщо елемент відкритий за замовчуванням
    if (accordionItem.classList.contains("is-expanded")) {
      accordionContent.style.height = "auto";
    } else {
      accordionContent.style.height = "0";
    }
  });
}

/**
 * Перемикає стан акордеона
 *
 * відкритий → закритий / закритий → відкритий
 */
function toggleAccordionItem(accordionItem) {
  const isExpanded = accordionItem.classList.contains("is-expanded");

  if (isExpanded) {
    collapseAccordionItem(accordionItem);
  } else {
    expandAccordionItem(accordionItem);
  }
}

/**
 * Відкриває один елемент акордеона (Opens accordion item)
 */
function expandAccordionItem(accordionItem) {
  // Якщо вже відкритий — нічого не робимо
  if (accordionItem.classList.contains("is-expanded")) {
    return;
  }

  const accordionTrigger = accordionItem.querySelector(".accordion__trigger");
  const accordionContent = accordionItem.querySelector(".accordion__content");

  if (!accordionTrigger || !accordionContent) {
    return;
  }

  accordionItem.classList.add("is-expanded");
  accordionTrigger.setAttribute("aria-expanded", "true");

  // Встановлюємо поточну(реальну) висоту контенту, щоб браузер міг анімувати відкриття
  accordionContent.style.height = `${accordionContent.scrollHeight}px`;

  // Після завершення анімації переводимо height в auto, щоб контент міг змінюватися динамічно
  accordionContent.addEventListener(
    "transitionend",
    () => {
      if (accordionItem.classList.contains("is-expanded")) {
        accordionContent.style.height = "auto";
      }
    },
    { once: true },
  );
}

/**
 * Закриває один елемент акордеона (Closes accordion item)
 */
function collapseAccordionItem(accordionItem) {
  // Якщо вже закритий — нічого не робимо
  if (!accordionItem.classList.contains("is-expanded")) {
    return;
  }

  const accordionTrigger = accordionItem.querySelector(".accordion__trigger");
  const accordionContent = accordionItem.querySelector(".accordion__content");

  if (!accordionTrigger || !accordionContent) {
    return;
  }

  // Якщо зараз height = auto, спочатку переводимо його в px
  accordionContent.style.height = `${accordionContent.scrollHeight}px`;

  // Форсуємо reflow, щоб браузер застосував нову висоту
  void accordionContent.offsetHeight;

  // Даємо браузеру застосувати висоту
  requestAnimationFrame(() => {
    accordionContent.style.height = "0px";
  });

  accordionItem.classList.remove("is-expanded");
  accordionTrigger.setAttribute("aria-expanded", "false");
}
