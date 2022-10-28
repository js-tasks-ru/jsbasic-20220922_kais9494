import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categoriesInfo = categories;
    this.categories = [];
    this.render();
    this.updateNav();
    this.onClick();
    this.onScroll();
  }

  render() {
    this.elem = createElement(`<div class="ribbon"></div>`);

    this.categoryInner = createElement(`<nav class="ribbon__inner"></nav>`);

    this.arrowLeft = createElement(` <button class="ribbon__arrow ribbon__arrow_left ">
<img src="/assets/images/icons/angle-icon.svg" alt="icon">
</button>`);

    this.arrowRight = createElement(` <button class="ribbon__arrow ribbon__arrow_right">
<img src="/assets/images/icons/angle-icon.svg" alt="icon">
</button>`);

    this.categoriesInfo.forEach(category => {
      this.categories.push(createElement(`<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`))
      this.categoryInner.append(this.categories[this.categories.length - 1]);
    });
    this.elem.append(this.arrowLeft, this.categoryInner, this.arrowRight);

  }
  updateNav() {

    setTimeout(() => {
      let scrollWidth = this.categoryInner.scrollWidth;
      let scrollLeft = this.categoryInner.scrollLeft;
      let clientWidth = this.categoryInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft == 0) {
        this.arrowLeft.classList.remove('ribbon__arrow_visible')
      }
      else {
        this.arrowLeft.classList.add('ribbon__arrow_visible')
      }

      if (scrollRight < 1) {
        this.arrowRight.classList.remove('ribbon__arrow_visible')
      }
      else {
        this.arrowRight.classList.add('ribbon__arrow_visible')
      }
    }, 0)
  }

  onClick() {
    this.elem.addEventListener('click', (e) => {
      if (e.target.closest('.ribbon__arrow_right')) {
        this.categoryInner.scrollBy(350, 0);
      }

      else if (e.target.closest('.ribbon__arrow_left')) {
        this.categoryInner.scrollBy(-350, 0);
      }

      else if (e.target.closest('.ribbon__item')) {
        e.preventDefault();
        let targetCategory = e.target.closest('.ribbon__item');
        targetCategory.dispatchEvent(new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
          detail: targetCategory.dataset.id, // уникальный идентификатора категории из её объекта
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        }));

        document.querySelector('.ribbon__item_active')?.classList.remove('ribbon__item_active')
        targetCategory.classList.add('ribbon__item_active')
      }
    })
  }

  onScroll() {
    this.categoryInner.addEventListener('scroll', (e) => {
      this.updateNav()
    })
  }
}
