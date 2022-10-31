import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.productsData = products;
    this.products = [];
    this.filters = {};
    this.render()
    this.addProducts()
  }
  render() {
    this.elem = createElement(`<div class="products-grid"></div>`)
    this.inner = createElement(` <div class="products-grid__inner"></div>`)
    this.elem.append(this.inner)
  }
  addProducts() {
    this.productsData.forEach(productData => {

      this.products.push(new ProductCard(productData));
    });
    console.log(this.products)
    this.products.forEach(el => {
      this.inner.append(el.elem)
    })

  }
  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters)

    this.inner.innerHTML = '';

    this.products.forEach(product => {
      if (this.checkProduct(product)) {
        this.inner.append(product.elem)
      }

    })

  }
  checkProduct(item) {
    if (this.filters.noNuts && item.product.nuts) {
      return false;
    }

    if (this.filters.vegeterianOnly && !item.product.vegeterian) {
      return false;
    }

    if (this.filters.maxSpiciness && item.product.spiciness > this.filters.maxSpiciness) {
      return false;
    }

    if (this.filters.category && item.product.category != this.filters.category) {
      return false;
    }

    return true;

  }
}
