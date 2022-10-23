import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slidesInfo = slides;
    this.elem;
    this.sliderInner;
    this.slides = [];
    this.slidesQty = this.slidesInfo.length;

    this.arrowLeft;
    this.arrowRight;

    this.activeSlide = 1;
    this.offsetDist = 0;

    this.render();
    this.updateNav();

    this.onClick();

  }
  render() {
    this.elem = createElement(`<div class="carousel"></div>`);

    this.arrowLeft = createElement(` <div class="carousel__arrow carousel__arrow_left"><img src="/assets/images/icons/angle-left-icon.svg" alt="icon"></div> `);
    this.arrowRight = createElement(`<div class="carousel__arrow carousel__arrow_right"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></div>`);

    this.sliderInner = createElement(`<div class="carousel__inner"></div>`)


    this.slidesInfo.forEach(slide => {

      this.slides.push(createElement(`
      <div class="carousel__slide" data-id="penang-shrimp" data-slide-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
              <span class="carousel__price">€${this.priceFormat(slide.price)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
          </div>
      </div>
  `))
      this.sliderInner.append(this.slides[this.slides.length - 1])

    });

    this.elem.append(this.arrowLeft, this.arrowRight, this.sliderInner)
  }
  priceFormat(price) {
    return price.toFixed(2);
  }
  onClick() {

    this.elem.addEventListener('click', (e) => {
      if (e.target.closest('.carousel__button')) {
        let targetSlide = e.target.closest('.carousel__slide');
        this.elem.dispatchEvent(new CustomEvent("product-add", { // имя события должно быть именно "product-add"
          detail: targetSlide.dataset.slideId, // Уникальный идентификатора товара из объекта товара
          bubbles: true // это событие всплывает - это понадобится в дальнейшем

        }));
      }
      else if (e.target.closest('.carousel__arrow')) {

        let targetBtn = e.target.closest('.carousel__arrow');
        let index = this.activeSlide;
        if (targetBtn == this.arrowLeft) {
          index--
        } else if (targetBtn == this.arrowRight) {
          index++
        }
        this.slideTo(index);
      }
    });
  }

  updateNav() {
    this.arrowRight.style.display = this.activeSlide == this.slidesQty ? 'none' : '';
    this.arrowLeft.style.display = this.activeSlide == 1 ? 'none' : '';
  }

  slideTo(index) {

    if (index > 0 && index <= this.slidesQty && index != this.activeSlide) {

      let slideWidth = this.elem.offsetWidth;
      let slideDifference = this.activeSlide - index;
      let translateValue = this.offsetDist + slideWidth * slideDifference;
      this.sliderInner.style.transform = `translateX(${translateValue}px)`

      this.offsetDist = translateValue;
      this.activeSlide = index;
      this.updateNav()
    }
  }
}
