export class ShoppingCartRepo {
  //get all shopping carts
  static getAllCarts() {
    return JSON.parse(localStorage.getItem("shoppingCarts"));
  }

  //get shoppingcart by id
  static getCartById(cartId) {
    let shoppingCarts = this.getAllCarts();
    return shoppingCarts.find((cart) => cart.cartId === cartId);
  }

  // Save all shopping carts in localstorage after any modification
  static saveShopingCarts(shoppingCarts) {
    localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCarts));
  }

  //add item to the shoppingCart
  static addItem(item, cartId) {
    if (item.constructor.name === "ShoppingCartItem") {
      let shoppingCart = this.getCartById(cartId);
      if (shoppingCart) {
        let existingItem = shoppingCart.items.find(
          (cartItem) => cartItem.itemId === item.itemId
        );
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          shoppingCart.items.push(item);
        }
        this.saveShopingCarts(JSON.stringify(shoppingCarts));
      }
    }
  }

  static removeItem(productId, cartId) {
    let shoppingCart = this.getCartById(cartId);
    if (shoppingCart) {
      shoppingCart.items = shoppingCart.items.filter(
        (cartItem) => cartItem.productId !== productId
      );
      this.saveShopingCarts(JSON.stringify(shoppingCarts));
    }
  }
}
