export class Category {
  #id;
  #name;
  static #autoIncrement = 1;

  constructor(name) {
    this.#id = Category.#autoIncrement++;
    this.Name = name;
  }

  get Id() {
    return this.#id;
  }

  set Id(_id) {
    throw new Error("You can't set id of the category");
  }

  get Name() {
    return this.#name;
  }

  set Name(name) {
    this.#name = name;
  }

  toJSON() {
    return { id: this.Id, name: this.Name };
  }
}
