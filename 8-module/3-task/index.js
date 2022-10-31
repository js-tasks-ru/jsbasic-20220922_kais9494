export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    console.log(this.cartItems)
    this.cartIcon.update(this);

  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach(item => {
      if (item.product.id == productId && amount == 1) {
        item.count++
      }
      else if (item.product.id == productId && amount == -1) {
        item.count--
        if (item.count === 0) {
          let itemIndex = this.cartItems.indexOf(item);
          this.cartItems.splice(itemIndex, 1);

        }
      }
    });
    console.log(this.cartItems)

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
      console.log(totalprice)
    }

    return totalprice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

