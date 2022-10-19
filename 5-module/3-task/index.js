function initCarousel() {
  let activeSlide = {
    num: 1,
    offset: 0,
  }
  let slides = document.querySelectorAll('.carousel__slide');

  if (slides && slides.length) {
    let slidesQty = slides.length;
    let prevBtn = document.querySelector('.carousel__arrow_left');
    let nextBtn = document.querySelector('.carousel__arrow_right');
    let sliderWrapper = document.querySelector('.carousel__inner');

    nextBtn.style.display = activeSlide.num == slidesQty ? 'none' : '';
    prevBtn.style.display = activeSlide.num == 1 ? 'none' : '';

    document.addEventListener('click', (e) => {
      if (e.target.closest('.carousel__arrow')) {
        let targetBtn = e.target.closest('.carousel__arrow');
        let slideCurrent = slides[activeSlide.num - 1];
        let slideWidth = slideCurrent.offsetWidth;
        if (targetBtn == nextBtn && activeSlide.num < slidesQty) {
          activeSlide.offset -= slideWidth;
          activeSlide.num++;
          sliderWrapper.style.transform = `translateX(${activeSlide.offset}px)`
        }
        else if (targetBtn == prevBtn && activeSlide.num > 1) {
          activeSlide.offset += slideWidth;
          activeSlide.num--;
          sliderWrapper.style.transform = `translateX(${activeSlide.offset}px)`
        }

        nextBtn.style.display = activeSlide.num == slidesQty ? 'none' : '';
        prevBtn.style.display = activeSlide.num == 1 ? 'none' : '';

      }
    })
  }
}

