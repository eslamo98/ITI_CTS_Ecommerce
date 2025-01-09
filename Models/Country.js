// Class representing a country with its name and code (e.g., "US" for United States)
export class Country {
  // Private attributes
  #name;
  #code;

  // Constructor to initialize a country with a name and code
  constructor(_name, _code) {
    this.#name = _name; // Set the country name
    this.#code = _code; // Set the country code
  }

  // Getter for the country name
  get Name() {
    return this.#name;
  }

  // Getter for the country code
  get Code() {
    return this.#code;
  }

  // Setter for the country name
  set Name(value) {
    this.#name = value;
  }

  // Setter for the country code
  set Code(value) {
    this.#code = value;
  }

  toJSON() {
    return {
      name: this.Name,
      code: this.Code,
    };
  }
}
