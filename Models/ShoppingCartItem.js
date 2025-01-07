// ShoppingCartItem class representing a single item in the shopping cart with details
// like product ID, name, quantity, price, etc.

import { ProductRepo } from "../Repository/ProductRepo.js";
import { Helpers } from "../Utils/Helpers.js";

export class ShoppingCartItem {
  // Private fields to hold item details
  #productId;
  #name;
  #quantity;
  #price;
  #totalPrice;
  #sellerId;

  // Constructor to initialize the shopping cart item with product ID, name, quantity, and price
  constructor(productId, name, quantity, price) {
    this.ProductId = productId;
    this.Name = name;
    this.Quantity = quantity;
    this.#price = price;
    this.#totalPrice = quantity * price; // Calculate total price based on quantity and price
    this.#sellerId = ProductRepo.getSellerIdByProductId(productId);
  }

  // Getters and setters with validation for various item properties

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
      this.#totalPrice = this.#quantity * this.#price; // Recalculate total price when quantity changes
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
      this.#totalPrice = this.#quantity * this.#price; // Recalculate total price when price changes
    } else {
      throw new Error("Price must be a positive number.");
    }
  }

  get TotalPrice() {
    return this.#totalPrice;
  }

  set TotalPrice(value) {
    throw new Error("Total price cannot be set directly."); // Total price is calculated, so it cannot be set directly
  }

  // Method to convert the item object into JSON format
  toJSON() {
    return {
      productId: this.ProductId,
      name: this.Name,
      quantity: this.Quantity,
      price: this.Price,
      totalPrice: this.TotalPrice,
      sellerId: this.#sellerId,
    };
  }
}
