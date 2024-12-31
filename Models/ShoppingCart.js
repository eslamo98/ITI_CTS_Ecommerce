import { Helpers } from "../Utils/Helpers.js";
export class ShoppingCart {
  #cartId;
  #userId;
  #items;
  #totalItems;
  #totalPrice;
  static #autoIncrement = 1;
  constructor(userId, items) {
    console.log(items);
    this.#cartId = ShoppingCart.#autoIncrement++;
    this.UserId = userId;
    this.Items = items;
    this.TotalItems = items.length;
    this.TotalPrice = items.reduce(
      (sum, shoppingCartItem) => sum + shoppingCartItem.TotalPrice,
      0
    );
  }

  //setters & getters
  get CartId() {
    return this.#cartId;
  }

  set CartId(value) {
    if (Helpers.isNumber(value) && Helpers.isPositive(value)) {
      this.#cartId = value;
    } else {
      throw new Error("Invalid cart ID. It should be a positive integer.");
    }
  }

  get UserId() {
    return this.#userId;
  }

  set UserId(value) {
    if (Helpers.isNumber(value) && Helpers.isPositive(value)) {
      this.#userId = value;
    } else {
      throw new Error("Invalid user ID. It should be a positive integer.");
    }
  }

  get Items() {
    return this.#items;
  }

  set Items(items) {
    if (Array.isArray(items)) {
      this.#items = items;
      this.updateTotalItemsAndPrice();
    } else {
      throw new Error("Invalid items. It should be an array of objects.");
    }
  }

  get TotalPrice() {
    return this.#totalPrice;
  }

  set TotalPrice(value) {
    if (Helpers.isNumber(value) && Helpers.isPositive(value)) {
      this.#totalPrice = value;
    } else {
      throw new Error("Invalid total price. It should be a positive number.");
    }
  }

  get TotalItems() {
    return this.#totalItems;
  }

  set TotalItems(value) {
    if (Helpers.isNumber(value) && Helpers.isPositive(value)) {
      this.#totalItems = value;
    } else {
      throw new Error("Invalid total items. It should be a positive integer.");
    }
  }

  //methods
  updateTotalItemsAndPrice() {
    this.TotalPrice = this.#items.reduce(
      (total, item) => total + item.TotalPrice,
      0
    );
    this.TotalItems = this.#items.length;
  }

  toJSON() {
    return {
      cartId: this.CartId,
      userId: this.UserId,
      items: this.Items.map((item) => item.toJSON()),
      totalItems: this.TotalItems,
      totalPrice: this.TotalPrice,
    };
  }
}
