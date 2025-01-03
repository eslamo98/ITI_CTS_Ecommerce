import { Helpers } from "../Utils/Helpers.js";

// Class representing a product with various attributes like ID, name, price, etc.

export class Product {

  // Private attributes for product details
  #id;
  #name;
  #price;
  #quantity;
  #description;
  #categoryId;
  #imgPath;

  // Static auto-increment ID counter for product instances
  static #autoIncrement = 1;

  // Constructor to initialize a product with the provided details
  constructor(_name, _price, _quantity, _desc, _catId, _imgPath) {
    // Assign a unique ID to the product and increment the static counter
    this.ID = Product.#autoIncrement++;
    this.Name = _name;
    this.Price = _price;
    this.Quantity = _quantity;
    this.Description = _desc;
    this.CategoryID = _catId;
    this.ImgPath = _imgPath;
  }

  // Getter and setter for the product ID with validation

  get ID() {
    return this.#id;
  }

  set ID(value) {
    if (value.constructor.name === "Number" && value > 0) {
      this.#id = value;
    } else {
      throw new Error("Invalid ID. ID must be a positive number.");
    }
  }

  // Getter and setter for the product name with validation
  
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


  // Getter and setter for the product price with validation

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


  // Getter and setter for the product quantity with validation

  get Quantity() {
    return this.#quantity;
  }

  set Quantity(value) {
    if (value.constructor.name === "Number" && value >= 0) {
      this.#quantity = value;
    } else {
      throw new Error("Invalid quantity. Quantity must be a non-negative number.");
    }
  }

  // Getter and setter for the product description with validation

  get Description() {
    return this.#description;
  }

  set Description(value) {
    if (value.constructor.name === "String" && value.trim() !== "") {
      this.#description = value;
    } else {
      throw new Error("Invalid description. Description must be a non-empty string.");
    }
  }

  // Getter and setter for the category ID with validation
  
  get CategoryId() {
    return this.#categoryId;
  }

  set CategoryId(value) {
    if (value.constructor.name === "Number" && value > 0) {
      this.#categoryId = value;
    } else {
      throw new Error("Invalid category ID. Category ID must be a positive number.");
    }
  }

  // Getter and setter for the image path
  
  get ImgPath() {
    return this.#imgPath;
  }

  set ImgPath(value) {
    this.#imgPath = value;
  }

  // Convert the product to a JSON object for easy transfer/storage
  
  toJSON() {
    return {
      ID: this.ID,
      Name: this.Name,
      Price: this.Price,
      Quantity: this.Quantity,
      Description: this.Description,
      CategoryID: this.CategoryID,
      ImgPath: this.ImgPath,
    };
  }
}
