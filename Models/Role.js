export class Role {
  #id;
  #name;

  static #autoIncreament = 1;

  constructor(name) {
    this.#id = Role.#autoIncreament++;
    this.#name = name;
  }

  get Id() {
    return this.#id;
  }

  set Id(id) {
    throw new Error("You can't set role id directly");
  }

  get Name() {
    return this.#name;
  }

  set Name(name) {
    this.#name = name;
  }

  toString() {
    return `Role {Id: ${this.#id}, Name: ${this.#name}}`;
  }
}
