// ShoppingCart class representing the user's shopping cart with items 
// and total price calculations.
import { Helpers } from "../Utils/Helpers.js";

export class ShoppingCart {
  // Private fields to hold cart details
  #cartId;
  #userId;
  #items;
  #totalItems;
  #totalPrice;

  // Static field to auto-increment cart ID for unique identification
  static #autoIncrement = 1;

  // Constructor to initialize the shopping cart
  constructor(userId, items) {
    console.log(items);  // Logging items to the console (for debugging purposes)
    
    this.#cartId = ShoppingCart.#autoIncrement++; // Auto-increment cart ID
    this.UserId = userId;  // Assign user ID to the cart
    this.Items = items;  // Set the items in the cart
    this.TotalItems = items.length;  // Calculate the total number of items
    this.TotalPrice = items.reduce(  // Calculate the total price of all items
      (sum, shoppingCartItem) => sum + shoppingCartItem.TotalPrice,
      0
    );
  }

  // Getters and setters with validation for various cart properties

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
      this.updateTotalItemsAndPrice(); // Recalculate total items and price when items are set
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

  // Method to update total price and total items after modifications
  updateTotalItemsAndPrice() {
    this.TotalPrice = this.#items.reduce(
      (total, item) => total + item.TotalPrice,
      0
    );
    this.TotalItems = this.#items.length;
  }

  // Method to convert the cart object into JSON format
  toJSON() {
    return {
      cartId: this.CartId,
      userId: this.UserId,
      items: this.Items.map((item) => item.toJSON()),  // Convert each item to JSON
      totalItems: this.TotalItems,
      totalPrice: this.TotalPrice,
    };
  }
}
