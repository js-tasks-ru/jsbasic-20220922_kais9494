import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render()
    this.onEsc_binded = this.onEsc.bind(this);
    this.onClick_binded = this.onClick.bind(this);

  }
  render() {
    this.elem = createElement(`<div class="modal"></div>`);
    this.ovelay = createElement(`<div class="modal__overlay"></div>`);
    this.modalInner = createElement(`<div class="modal__inner"></div>`);
    this.modalHeader = createElement(`<div class="modal__header"></div>`);
    this.closeBtn = createElement(`<button type="button" class="modal__close">
    <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
  </button>`);

    this.modalTitle = createElement(`<h3 class="modal__title"></h3>`);
    this.modalBody = createElement(`<div class="modal__body"></div>`);

    this.elem.append(this.ovelay, this.modalInner);
    this.modalInner.append(this.modalHeader, this.modalBody)
    this.modalHeader.append(this.closeBtn, this.modalTitle)
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open')

    document.addEventListener('keydown', this.onEsc_binded);
    document.addEventListener('click', this.onClick_binded);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');

    document.removeEventListener('keydown', this.onEsc_binded);
    document.removeEventListener('click', this.onClick_binded);
  }

  setTitle(title) {
    this.modalTitle.innerText = title;
  }

  setBody(node) {
    this.modalBody.innerHTML = node.outerHTML;
  }

  onEsc(e) {
    if (e.code === 'Escape') {
      this.close()
    }
  }

  onClick(e) {
    if (e.target.closest('.modal__close')) {
      this.close()
    }
  }
}
