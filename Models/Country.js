export class Country {
  #name;
  #code;

  constructor(_name, _code) {
    this.#name = _name;
    this.#code = _code;
  }

  get Name() {
    return this.#name;
  }

  get Code() {
    return this.#code;
  }

  set Name(value) {
    this.#name = value;
  }

  set Code(value) {
    this.#code = value;
  }
}
