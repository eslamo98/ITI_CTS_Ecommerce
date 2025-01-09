import { Helpers } from "../Utils/Helpers.js";
import { ProductRepo } from "./ProductRepo.js";

export class ShoppingCartRepo {
  //get all shopping carts
  static getAllCarts() {
    return JSON.parse(localStorage.getItem("shoppingCarts")) || [];
  }

  //get shoppingcart by id
  static getCartById(cartId) {
    let shoppingCarts = this.getAllCarts();
    return shoppingCarts.find((cart) => cart.cartId === cartId);
  }

  static getCartByUserId(userId) {
    let shoppingCarts = this.getAllCarts();
    return shoppingCarts.find((cart) => cart.userId === userId);
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

  static updateCartInfo(cart) {
    cart.totalPrice = cart.items.reduce(
      (sum, shoppingCartItem) => sum + shoppingCartItem.totalPrice,
      0
    );
    cart.totalItems = cart.items.length;
    this.updateShoppingCart(cart.cartId, cart);
  }

  static removeItem(productId, cartId) {
    let shoppingCart = this.getCartById(cartId);

    if (shoppingCart) {
      shoppingCart.items = shoppingCart.items.filter(
        (cartItem) => cartItem.productId !== productId
      );

      this.updateCartInfo(shoppingCart);
    }
  }

  static updateShoppingCart(cartId, updatedCart) {
    let shoppingCarts = this.getAllCarts();
    let index = shoppingCarts.findIndex((cart) => cart.cartId === cartId);
    if (index > -1) {
      shoppingCarts[index] = updatedCart;
      this.saveShopingCarts(shoppingCarts);
      return true;
    }
    return false;
  }

  static decreaseItemQty(cart, productId) {
    let shoppingCarts = this.getAllCarts();
    Helpers.myConsole(shoppingCarts, "before");
    let index = shoppingCarts.findIndex(
      (cartItem) => cartItem.cartId === cart.cartId
    );

    if (index > -1) {
      cart.items.forEach((item) => {
        if (item.productId === productId) {
          if (item.quantity > 0) {
            item.quantity--;
            item.totalPrice = item.quantity * item.price;
            this.updateCartInfo(cart);
            if (item.quantity == 0) {
              this.removeItem(item.productId, cart.cartId);
              shoppingCarts = this.getAllCarts();
              Helpers.myConsole(shoppingCarts, "after");
            }
          } else {
            this.removeItem(item.productId, cart.cartId);
          }
        }
      });
    }
  }

  static increaseItemQty(cart, productId) {
    let shoppingCarts = this.getAllCarts();
    let index = shoppingCarts.findIndex(
      (cartItem) => cartItem.cartId === cart.cartId
    );

    let product = ProductRepo.GetProductById(productId);

    if (index > -1) {
      cart.items.forEach((item) => {
        if (item.productId === productId) {
          if (item.quantity < product.quantity) {
            item.quantity++;
            item.totalPrice = item.quantity * item.price;
            this.updateCartInfo(cart);
          } else {
            alert("You exceeded the quantity in stock"); // or redirect to a page that says "Out of stock"
          }
        }
      });
    }
  }

  static emptyCart(cart) {
    cart.items = [];
    this.updateCartInfo(cart);
  }
}
