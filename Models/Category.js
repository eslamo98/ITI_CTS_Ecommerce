// Class representing a product category with a unique ID and a name
export class Category {
  // Private attributes
  #id;
  #name;
  
  // Static property for auto-incrementing category IDs
  static #autoIncrement = 1;

  // Constructor to initialize a category with a given name
  constructor(name) {
    // Assign a unique ID to the category and increment the static counter
    this.#id = Category.#autoIncrement++;
    this.Name = name;  // Set the category name using the setter
  }

  // Getter for the category ID (read-only)
  get Id() {
    return this.#id;
  }

  // Setter for the category ID - throws an error since ID is read-only
  set Id(_id) {
    throw new Error("You can't set id of the category");
  }

  // Getter for the category name
  get Name() {
    return this.#name;
  }

  // Setter for the category name
  set Name(name) {
    this.#name = name;
  }

  // Convert the category to a JSON format for easy transfer/storage
  toJSON() {
    return { id: this.Id, name: this.Name };
  }
}
