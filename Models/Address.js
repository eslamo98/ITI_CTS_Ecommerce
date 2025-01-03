// UserAddress class representing the user's address with street, city, state, zip code, and country.
import { Helpers } from "../Utils/Helpers.js";

export class UserAddress {
  // Private fields for address details
  #id;
  #street;
  #city;
  #state;
  #zipCode;
  #country;

  // Constructor to initialize the address fields
  constructor(street, city, state, zipCode, country) {
    this.Street = street;
    this.City = city;
    this.State = state;
    this.ZipCode = zipCode;
    this.Country = country;
  }

  // Method to return formatted address details as a string
  get addressDetails() {
    return `Street: ${this.Street}, City: ${this.City}, State: ${this.State}, Zip Code: ${this.ZipCode}, Country: ${this.Country}`;
  }

  // Getters and setters with validation for address properties

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

  // Similar setters and getters for State, ZipCode, and Country

  // Method to convert the address object into JSON format
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
