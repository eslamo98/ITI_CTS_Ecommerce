// Import necessary modules and helpers
import { PaymentMethodRepo } from "../Repository/PaymentMethodRepo.js";
import { Helpers } from "../Utils/Helpers.js";

export class PaymentMethod {
  // Private fields for the payment method ID and method name
  #id;
  #method;

  // Static field for auto-incrementing the payment method ID
  static #autoIncrement = 1;

  // Constructor to initialize the PaymentMethod with a method name
  constructor(_method) {
    // Auto-increment the payment method ID and set the method name
    this.#id = PaymentMethod.#autoIncrement++;  
    this.Method = _method;  // Use setter to validate the method name
  }

  // Getter for ID (no setter provided as the ID is auto-generated and immutable)
  get ID() {
    return this.#id;
  }

  // Setter for ID (throws error to prevent modification of the ID)
  set ID(value) {
    throw new Error("You can't set payment Id.");
  }

  // Getter and setter for the payment method name (ensures it's a valid non-empty string)
  get Method() {
    return this.#method;
  }
  
  set Method(value) {
    if (Helpers.isOnlyText(value) && Helpers.isNotNullOrEmpty(value)) {
      this.#method = value;  // If valid, set the method name
    } else {
      throw new Error("Invalid method. Method must be a non-empty string.");
    }
  }

  // Method to convert the payment method instance to a JSON format
  toJSON() {
    return {
      id: this.ID,
      method: this.Method,  // Include both the ID and method name in the JSON representation
    };
  }
}
