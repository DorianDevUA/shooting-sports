export function initTabs(selector = ".tabs") {
  // 1️⃣ Знаходимо всі таб-блоки на сторінці
  const tabsList = document.querySelectorAll(selector);

  // Якщо немає жодного — виходимо
  if (!tabsList.length) {
    return;
  }

  // 2️⃣ Ініціалізуємо кожен таб-блок окремо
  tabsList.forEach((tabs) => {
    const buttons = tabs.querySelectorAll(".tabs__btn");
    const panels = tabs.querySelectorAll(".tabs__panel");

    // Якщо щось відсутнє — пропускаємо блок
    if (!buttons.length || !panels.length) {
      return;
    }

    // 3️⃣ Перевіряємо: чи є вже активний таб
    const hasActiveTab = [...buttons].some((btn) =>
      btn.classList.contains("is-active"),
    );

    // 4️⃣ Якщо немає активного — активуємо перший
    if (!hasActiveTab) {
      buttons[0].classList.add("is-active");
      panels[0]?.classList.add("is-active");
    }

    // 5️⃣ Делегування кліку (один listener на весь блок)
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".tabs__btn");

      // Клік не по кнопці — ігноруємо
      if (!btn) {
        return;
      }

      // якщо таб(кнопка) вже активний — нічого не робимо
      if (btn.classList.contains("is-active")) {
        return;
      }

      const tabId = btn.dataset.tab;

      // Якщо немає data-tab — попереджаємо
      if (!tabId) {
        console.warn(
          `Tabs: Tab-button <${btn.textContent}> without data-tab atribute`,
        );
        return;
      }

      // 6️⃣ Знімаємо активний стан у всіх кнопок та панелей
      buttons.forEach((b) => b.classList.remove("is-active"));
      panels.forEach((p) => p.classList.remove("is-active"));

      // 7️⃣ Активуємо кнопку
      btn.classList.add("is-active");

      // 8️⃣ Знаходимо відповідну панель
      const targetPanel = tabs.querySelector(
        `.tabs__panel[data-tab="${tabId}"]`,
      );

      if (!targetPanel) {
        console.warn(`Tabs: panel not found for "${tabId}"`);
        return;
      }

      // 9️⃣ Активуємо панель
      targetPanel.classList.add("is-active");
    });
  });
}
