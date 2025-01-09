import { ProductRepo } from "../Repository/ProductRepo.js";
import { Helpers } from "../Utils/Helpers.js";

export class Product {
  #id;
  #name;
  #price;
  #quantity;
  #description;
  #categoryId;
  #imgPath;
  #sellerId;

  static #autoIncrement =
    ProductRepo.getNumberOfProductsInLOSt() === 0
      ? 1
      : ProductRepo.getNumberOfProductsInLOSt() + 1;

  constructor(_name, _price, _quantity, _desc, _catId, _imgPath, _sellerId) {
    this.ID = Product.#autoIncrement++;
    this.Name = _name;
    this.Price = _price;
    this.Quantity = _quantity;
    this.Description = _desc;
    this.CategoryID = _catId;
    this.ImgPath = _imgPath;
    this.SellerId = _sellerId;
  }

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
    if (Number(value).constructor.name === "Number" && value >= 0) {
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

  get ImgPath() {
    return this.#imgPath;
  }

  set ImgPath(value) {
    this.#imgPath = value;
  }

  get SellerId() {
    return this.#sellerId;
  }

  set SellerId(value) {
    if (Helpers.isNumber(value) && Helpers.isPositive(value)) {
      this.#sellerId = value;
    } else {
      throw new Error(
        "Invalid seller ID. Seller ID must be a positive number."
      );
    }
  }

  toJSON() {
    return {
      id: this.ID,
      name: this.Name,
      price: this.Price,
      quantity: this.Quantity,
      description: this.Description,
      categoryID: this.CategoryID,
      sellerId: this.SellerId,
      imgPath: this.ImgPath,
    };
  }
}
