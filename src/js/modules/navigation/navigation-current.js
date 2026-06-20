function updateCurrentNavigationLink() {
  // Отримуємо всі navigation links
  const navigationLinks = document.querySelectorAll(".site-nav__link");
  // Поточний URL сторінки
  const currentPathname = window.location.pathname;

  navigationLinks.forEach((link) => {
    // Pathname конкретного navigation link
    const linkPathname = new URL(link.href).pathname;

    // Перевіряємо чи поточна сторінка належить до секції navigation item
    const isCurrentPage = currentPathname.startsWith(linkPathname);

    // Якщо isCurrentPage = true → клас додається / Якщо false → клас видаляється
    link.classList.toggle("is-current", isCurrentPage);
  });
}

export { updateCurrentNavigationLink };
