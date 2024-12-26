import { Helpers } from "../Utils/Helpers.js";

export class Product {
  #id;
  #name;
  #price;
  #quantity;
  #description;
  #categoryId;
  constructor(_id, _name, _price, _quantity, _desc, _catId) {
    this.ID = _id;
    this.Name = _name;
    this.Price = _price;
    this.Quantity = _quantity;
    this.Description = _desc;
    this.CategoryID = _catId;
  }

  get ID() {
    return this.#id;
  }
  set ID(value) {
    if (Helpers.isNumber(value) && Helpers.isPositive()) {
      this.#id = value;
    } else {
      throw new Error("Invalid ID. ID must be a positive number.");
    }
  }

  get Name() {
    return this.#name;
  }

  set Name(value) {
    if (value.constructor.name === "String" && value.trim() !== "") {
      this.#name = value;
    } else {
      throw new Error("Invalid name. Name must be a non-empty string.");
    }
  }

  get Price() {
    return this.#price;
  }

  set Price(value) {
    if (value.constructor.name === "Number" && value > 0) {
      this.#price = value;
    } else {
      throw new Error("Invalid price. Price must be a positive number.");
    }
  }

  get Quantity() {
    return this.#quantity;
  }

  set Quantity(value) {
    if (value.constructor.name === "Number" && value >= 0) {
      this.#quantity = value;
    } else {
      throw new Error(
        "Invalid quantity. Quantity must be a non-negative number."
      );
    }
  }

  get Description() {
    return this.#description;
  }

  set Description(value) {
    if (value.constructor.name === "String" && value.trim() !== "") {
      this.#description = value;
    } else {
      throw new Error(
        "Invalid description. Description must be a non-empty string."
      );
    }
  }

  get CategoryId() {
    return this.#categoryId;
  }

  set CategoryId(value) {
    if (value.constructor.name === "Number" && value > 0) {
      this.#categoryId = value;
    } else {
      throw new Error(
        "Invalid category ID. Category ID must be a positive number."
      );
    }
  }
}
