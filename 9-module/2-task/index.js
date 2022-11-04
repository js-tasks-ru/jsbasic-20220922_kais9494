import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carousel = new Carousel(slides);
    let sliderWrapper = document.querySelector('[data-carousel-holder]')
    sliderWrapper.append(carousel.elem);

    let ribbon = new RibbonMenu(categories);
    let container = document.querySelector('[data-ribbon-holder]');
    container.append(ribbon.elem);

    let stepSlider = new StepSlider({
      steps: 5
    });

    let holder = document.querySelector('[data-slider-holder]');
    holder.append(stepSlider.elem);

    let cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    const response = await fetch('products.json');
    const products = await response.json();
    let productsGrid = new ProductsGrid(products);
    let productGridContainer = document.querySelector('[data-products-grid-holder]');

    productGridContainer.append(productsGrid.elem);

    document.body.addEventListener('product-add', (e) => {
      console.log(e)
      let productId = e.detail;
      let product = products.find((el) => el.id == productId)
      cart.addProduct(product)
    })

    document.body.addEventListener('slider-change', (e) => {
      productsGrid.updateFilter({
        maxSpiciness: e.detail // значение остроты из события 'slider-change'
      });
    })

    document.body.addEventListener('ribbon-select', (e) => {
      productsGrid.updateFilter({
        category: e.detail // категория из события 'ribbon-select'
      });
    })

    document.body.addEventListener('change', (e) => {
      let checkBox = e.target.closest('input[type=checkbox]')
      if (checkBox) {
        if (checkBox.id == 'vegeterian-checkbox') {
          productsGrid.updateFilter({
            vegeterianOnly: checkBox.checked // новое значение чекбокса
          });
        }
        else if (checkBox.id == 'nuts-checkbox') {
          productsGrid.updateFilter({
            noNuts: checkBox.checked // новое значение чекбокса
          });
        }
      }
    })
  }
}
