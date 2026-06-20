import { CLASS_STATES } from "../../constants/ui.js";

export class FiltersPanel {
  constructor({ toggleSelector, panelSelector }) {
    this.refs = {
      toggle: document.querySelector(toggleSelector),
      panel: document.querySelector(panelSelector),
    };

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.refs.toggle?.addEventListener("click", this.handleToggleClick);
  }

  // ========================
  // Handlers
  // ========================

  handleToggleClick = () => {
    this.togglePanel();
  };

  // ========================
  // Panel logic
  // ========================

  togglePanel() {
    this.refs.toggle?.classList.toggle(CLASS_STATES.ACTIVE);
    this.refs.panel?.classList.toggle(CLASS_STATES.OPEN);
  }

  openPanel() {
    this.refs.toggle?.classList.add(CLASS_STATES.ACTIVE);
    this.refs.panel?.classList.add(CLASS_STATES.OPEN);
  }

  closePanel() {
    this.refs.toggle?.classList.remove(CLASS_STATES.ACTIVE);
    this.refs.panel?.classList.remove(CLASS_STATES.OPEN);
  }

  isOpen() {
    return this.refs.panel?.classList.contains(CLASS_STATES.OPEN);
  }
}
