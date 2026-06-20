import { modalTemplates } from './modal-templates.js';

export function initModal() {
  const refs = {
    modalContainer: document.querySelector('[data-modal-content]'),
    backdrop: document.querySelector('[data-backdrop]'),
    closeBtn: document.querySelector('[data-modal-close]'),
    body: document.body,
  };

  if (!refs.modalContainer || !refs.backdrop) {
    return;
  }

  function getModalTemplate(type) {
    return modalTemplates[type] || modalTemplates.default;
  }

  function renderModal(type) {
    const templateFn = getModalTemplate(type);
    refs.modalContainer.innerHTML = templateFn();
  }

  function openModal(type) {
    renderModal(type);
    refs.body.classList.add('modal-open');
    window.addEventListener('keydown', onEscPress);
  }

  function closeModal() {
    refs.body.classList.remove('modal-open');
    window.removeEventListener('keydown', onEscPress);
  }

  function onDocumentClick(evt) {
    const openBtn = evt.target.closest('[data-modal-open]');

    if (!openBtn) {
      return;
    }

    const type = openBtn.dataset.modalType;

    if (!type) {
      return;
    }

    openModal(type);
  }

  function onEscPress(e) {
    if (e.code === 'Escape') {
      closeModal();
    }
  }

  function onBackdropClick(evt) {
    if (evt.target === refs.backdrop) {
      closeModal();
    }
  }

  document.addEventListener('click', onDocumentClick);
  refs.closeBtn?.addEventListener('click', closeModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
}
