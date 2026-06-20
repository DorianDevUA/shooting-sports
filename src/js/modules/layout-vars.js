export function initLayoutVars() {
  const header = document.querySelector('.page-header');

  function setViewportVar() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  function setHeaderHeightVar() {
    if (!header) {
      return;
    }

    document.documentElement.style.setProperty('--page-header-height', `${header.offsetHeight}px`);
  }

  function updateLayoutVars() {
    setViewportVar();
    setHeaderHeightVar();
  }

  updateLayoutVars();

  if (header) {
    new ResizeObserver(setHeaderHeightVar).observe(header);
  }

  window.addEventListener('resize', setViewportVar);
}
