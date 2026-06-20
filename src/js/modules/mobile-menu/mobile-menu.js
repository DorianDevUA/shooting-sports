export function initMobileMenu() {
  const mobileMenuContainer = document.querySelector('.js-mobile-menu-container');
  const openMenuBtn = document.querySelector('.js-open-mobile-menu');
  const closeMenuBtn = document.querySelector('.js-close-mobile-menu');

  if (!mobileMenuContainer || !openMenuBtn || !closeMenuBtn) return;

  const openMobileMenu = () => {
    if (mobileMenuContainer.classList.contains('is-open')) return;

    document.body.classList.add('mobile-menu-open');
    mobileMenuContainer.classList.add('is-open');
    openMenuBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMobileMenu = () => {
    document.body.classList.remove('mobile-menu-open');
    mobileMenuContainer.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', 'false');
  };

  openMenuBtn.addEventListener('click', openMobileMenu);
  closeMenuBtn.addEventListener('click', closeMobileMenu);

  document.addEventListener('keydown', event => {
    if (event.code === 'Escape' && mobileMenuContainer.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (e.matches) closeMobileMenu();
  });
}
