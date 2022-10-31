import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return false;
    }
    else if (this.cartItems.find(item => item.product === product)) {
      this.cartItems.forEach(item => {
        if (item.product == product) {
          item.count++
        }
      });
    }
    else {
      this.cartItems.push(Object.assign({
        product,
        count: 1
      }));
    }
    this.getTotalCount();
    this.getTotalPrice()
    this.cartIcon.update(this);
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach(item => {
      if (item.product.id == productId && amount == 1) {
        item.count++
        this.onProductUpdate(item)
      }
      else if (item.product.id == productId && amount == -1) {
        item.count--
        if (item.count === 0) {
          let itemIndex = this.cartItems.indexOf(item);
          this.cartItems.splice(itemIndex, 1);

        }
        this.onProductUpdate(item)
      }
    });

  }

  isEmpty() {
    if (this.cartItems.length > 0) {
      return false
    }
    else {
      return true
    }
  }

  getTotalCount() {
    let totalCount = 0;
    if (this.cartItems.length > 0) {
      totalCount = this.cartItems.reduce((prev, current) => {
        return (+prev + +current.count)
      }, 0)
    }
    return totalCount;
  }

  getTotalPrice() {
    let totalprice = 0;
    if (this.cartItems.length > 0) {
      totalprice = this.cartItems.reduce((prev, current) => {
        return (+prev + +current.product.price * current.count)
      }, 0)
    }

    return totalprice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    let products = '';

    this.cartItems.forEach(item => {
      let productData = item.product;
      let count = item.count;
      products += this.renderProduct(productData, count).outerHTML
    });
    let modalFrom = this.renderOrderForm().outerHTML;
    this.modal.setBody(createElement(`<div>${products}${modalFrom} </div>`));
    this.modal.open();

    let form = this.modal.elem.querySelector('.cart-form')
    form.addEventListener('submit', (e) => {
      this.onSubmit(e)
    })

    let qtyBtns = this.modal.elem.querySelectorAll('.cart-counter__button');
    qtyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.onQtyProdClick(e)
      })
    })
  }

  onProductUpdate(cartItem) {
    if (!document.body.classList.contains('is-modal-open')) {
      return false;
    }
    if (this.isEmpty()) {
      this.modal.close()
    }
    this.cartIcon.update(this);

    let productId = cartItem.product.id;
    let modalBody = this.modal.elem;
    let cartItemElem = modalBody.querySelector(`[data-product-id="${productId}"]`);
    if (cartItem.count == 0) {
      cartItemElem.remove();
      return false;
    }

    let productCount = cartItemElem.querySelector(`.cart-counter__count`);
    let productPrice = cartItemElem.querySelector(`.cart-product__price`);
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    let price = cartItem.product.price * cartItem.count
    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = '€' + price.toFixed(2);
    infoPrice.innerHTML = '€' + this.getTotalPrice().toFixed(2);
  }

  onSubmit(event) {
    event.preventDefault();

    let form = event.target
    let submitBtn = form.querySelector('[type=submit]')

    submitBtn.classList.add('is-loading')

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('ошибка при отправке')
        }
        response.json()
      })
      .then(data => {
        this.modal.setTitle('Success!');
        this.cartItems = [];
        this.cartIcon.update(this);
        this.modal.setBody(createElement(`<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`));
      })
      .catch(err => {
        alert(err)
      })
      .finally(() => {
        submitBtn.classList.remove('is-loading')
      })
  };

  onQtyProdClick(e) {
    let targetBtn = e.target.closest('.cart-counter__button')
    let productId = e.target.closest('.cart-product')?.dataset.productId;
    let amount;
    if (targetBtn.classList.contains('cart-counter__button_minus')) {
      amount = -1
    } else {
      amount = 1
    }
    this.updateProductCount(productId, amount)
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

