import { Helpers } from "../Utils/Helpers.js";

export class UserAddress {
  //private fields
  #id;
  #street;
  #city;
  #state;
  #zipCode;
  #country;

  constructor(street, city, state, zipCode, country) {
    this.Street = street;
    this.City = city;
    this.State = state;
    this.ZipCode = zipCode;
    this.Country = country;
  }

  get addressDetails() {
    return `Street: ${this.Street}, City: ${this.City}, State: ${this.State}, Zip Code: ${this.ZipCode}, Country: ${this.Country}`;
  }

  //getters & setters
  get Street() {
    return this.#street;
  }

  set Street(street) {
    this.#street = street;
  }

  get City() {
    return this.#city;
  }

  set City(city) {
    this.#city = city;
  }

  get State() {
    return this.#state;
  }

  set State(state) {
    this.#state = state;
  }

  get ZipCode() {
    return this.#zipCode;
  }

  set ZipCode(zipCode) {
    if (Helpers.isNumber(zipCode)) {
      this.#zipCode = zipCode;
    } else {
      throw new Error("Zip code must only contain numeric characters.");
    }
  }

  get Country() {
    return this.#country;
  }

  set Country(country) {
    if (Helpers.isOnlyText(country)) {
      this.#country = country;
    } else {
      throw new Error("Country must only contain alphabetic characters.");
    }
  }

  toJSON() {
    return {
      street: this.Street,
      city: this.City,
      state: this.State,
      zipCode: this.ZipCode,
      country: this.Country,
    };
  }
}
