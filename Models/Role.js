// Class representing a role in the system (e.g., Admin, User)

export class Role {

  // Private attributes for role details
  #id;
  #name;

  // Static property for auto-incrementing role IDs
  static #autoIncreament = 1;

  // Constructor to initialize a role with a name
  constructor(name) {
    // Assign a unique ID to the role and increment the static counter
    this.#id = Role.#autoIncreament++;
    this.#name = name;
  }

  // Getter for the role ID (read-only)
  get Id() {
    return this.#id;
  }

  // Setter for the role ID - throws an error since ID is read-only
  set Id(id) {
    throw new Error("You can't set role id directly");
  }

  // Getter for the role name
  get Name() {
    return this.#name;
  }

  // Setter for the role name
  set Name(name) {
    this.#name = name;
  }

  // Convert the role to a string representation
  toString() {
    return `Role {Id: ${this.#id}, Name: ${this.#name}}`;
  }

  // Convert the role to a JSON format for easy transfer/storage
  toJSON() {
    return { Id: this.#id, Name: this.#name };
  }
}
