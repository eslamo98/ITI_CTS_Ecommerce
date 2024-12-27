import { Helpers } from "../Utils/Helpers.js";

export class Address {
  //private fields
  #street;
  #city;
  #state;
  #zipCode;
  #country;

  constructor(street, city, state, zipCode, country) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
  }

  get addressDetails() {
    return `Street: ${this.street}, City: ${this.city}, State: ${this.state}, Zip Code: ${this.zipCode}, Country: ${this.country}`;
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

  //"street": "456 Elm St",
  //"city": "Los Angeles",
  //"state": "CA",
  //"zipCode": "90001",
  //"country": "U.S.A"
}
