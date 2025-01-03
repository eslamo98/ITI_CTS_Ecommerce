import { PaymentMethodRepo } from "../Repository/PaymentMethodRepo.js";
import { Helpers } from "../Utils/Helpers.js";

export class PaymentMethod {
  #id;
  #method;
  static #autoIncrement = 1;

  constructor(_method) {
    this.#id = User.#autoIncrement++;
    this.Method = _method;
  }

  get ID() {
    return this.#id;
  }
  set ID(value) {
    throw new Error("You can't set payment Id.");
  }

  get Method() {
    return this.#method;
  }
  set Method(value) {
    if (Helpers.isOnlyText(value) && Helpers.isNotNullOrEmpty(value)) {
      this.#method = value;
    } else {
      throw new Error("Invalid method. Method must be a non-empty string.");
    }
  }

  toJSON() {
    return {
      id: this.ID,
      method: this.Method,
    };
  }
}
