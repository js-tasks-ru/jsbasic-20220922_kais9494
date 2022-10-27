import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.sliderProgress = 0;
    this.render();
    this.onclick();
    this.onMouseDown_binded = this.onMouseDown.bind(this)
    this.onSliderThumbMove_binded = this.onSliderThumbMove.bind(this)
    this.onSliderThumbUp_binded = this.onSliderThumbUp.bind(this)

    document.addEventListener('pointerdown', this.onMouseDown_binded);
  }

  render() {
    this.elem = createElement(`<div class="slider"></div>`);
    this.sliderThumb = createElement(`<div class="slider__thumb"></div>`);
    this.value = createElement(`<span class="slider__value">0</span>`);
    this.sliderThumb.append(this.value)
    this.sliderSteps = createElement(`<div class="slider__steps"></div>`);
    this.sliderSteps.innerHTML = '<span></span>'.repeat(this.steps);
    this.sliderProgress = createElement(`<div class="slider__progress" style="width:0%;"></div>`);
    this.elem.append(this.sliderThumb, this.sliderProgress, this.sliderSteps)
    this.allSlides = this.sliderSteps.querySelectorAll('span');
    this.allSlides[0].classList.add('slider__step-active');
  }

  onclick() {
    this.elem.addEventListener('click', e => {
      let left = e.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      this.approximateValue = Math.round(leftRelative * segments);
      this.value.innerText = this.approximateValue;
      this.valuePercents = this.approximateValue / segments * 100;
      this.sliderProgress.style.width = this.valuePercents + '%';
      this.sliderThumb.style.left = this.valuePercents + '%';
      this.elem.dispatchEvent(new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.approximateValue, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      }));

      this.activeSlide();
    })
  }

  onMouseDown(e) {
    if (e.target.closest('.slider__thumb')) {
      let left = e.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      if (leftRelative < 0) {
        leftRelative = 0;
      }
      if (leftRelative > 1) {
        leftRelative = 1;
      }
      this.leftPercents = leftRelative * 100;
      this.approximateValue = Math.round(leftRelative * segments);
      this.value.innerText = this.approximateValue;

      document.addEventListener('pointermove', this.onSliderThumbMove_binded)
      document.addEventListener('pointerup', this.onSliderThumbUp_binded)
    }
  }

  onSliderThumbMove(e) {
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    this.leftPercents = leftRelative * 100;
    this.approximateValue = Math.round(leftRelative * segments);
    this.value.innerText = this.approximateValue;
    this.sliderProgress.style.width = this.leftPercents + '%';
    this.sliderThumb.style.left = this.leftPercents + '%';
    this.elem.classList.add('slider_dragging')
    this.activeSlide();
  }

  onSliderThumbUp(e) {
    this.elem.classList.remove('slider_dragging')
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = this.elem.offsetWidth == 0 ? 0 : left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    this.approximateValue = Math.round(leftRelative * segments);
    this.value.innerText = this.approximateValue;
    this.valuePercents = this.approximateValue / segments * 100;
    this.sliderProgress.style.width = this.valuePercents + '%';
    this.sliderThumb.style.left = this.valuePercents + '%';
    this.elem.dispatchEvent(new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.approximateValue == 0 ? 1 : this.approximateValue, // значение 0,np 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    }));
    console.log(leftRelative)
    console.log(this.approximateValue)

    document.removeEventListener('pointermove', this.onSliderThumbMove_binded)
    document.removeEventListener('pointerup', this.onSliderThumbUp_binded)
  }

  activeSlide() {
    this.allSlides.forEach((span, index) => {
      if (index == this.approximateValue) {
        span.classList.add('slider__step-active')
      } else {
        span.classList.remove('slider__step-active')
      }
    })
  }
}
