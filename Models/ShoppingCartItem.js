import { Helpers } from "../Utils/Helpers.js";

export class ShoppingCartItem {
  #productId;
  #name;
  #quantity;
  #price;
  #totalPrice;

  constructor(productId, name, quantity, price) {
    this.ProductId = productId;
    this.Name = name;
    this.Quantity = quantity;
    this.#price = price;
    this.#totalPrice = quantity * price;
  }

  get ProductId() {
    return this.#productId;
  }
  set ProductId(value) {
    if (Helpers.isNumber(value) && Helpers.isPositive(value)) {
      this.#productId = value;
    } else {
      throw new Error("Product ID must be a positive integer.");
    }
  }

  get Name() {
    return this.#name;
  }
  set Name(value) {
    if (value.trim() !== "") {
      this.#name = value;
    } else {
      throw new Error("Product name must be a non-empty string.");
    }
  }

  get Quantity() {
    return this.#quantity;
  }
  set Quantity(value) {
    if (Helpers.isNumber(value) && Helpers.isPositive(value)) {
      this.#quantity = value;
      this.#totalPrice = this.#quantity * this.#price;
    } else {
      throw new Error("Quantity must be a positive integer.");
    }
  }

  get Price() {
    return this.#price;
  }
  set Price(value) {
    if (Helpers.isNumber(value) && value > 0) {
      this.#price = value;
      this.#totalPrice = this.#quantity * this.#price;
    } else {
      throw new Error("Price must be a positive number.");
    }
  }

  get TotalPrice() {
    return this.#totalPrice;
  }

  set TotalPrice(value) {
    throw new Error("Total price cannot be set directly.");
  }

  toJSON() {
    return {
      productId: this.ProductId,
      name: this.Name,
      quantity: this.Quantity,
      price: this.Price,
      totalPrice: this.TotalPrice,
    };
  }
}
