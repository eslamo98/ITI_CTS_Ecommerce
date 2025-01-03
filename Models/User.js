// User class representing a user with details like name, email, phone, password, address, etc.
export class User {
  // Private fields for user attributes
  #id;
  #name;
  #firstName;
  #lastName;
  #phone;
  #email;
  #roleId;
  #password;
  #address;
  #imgPath;

  // Static field to auto-increment user IDs for unique identification
  static #autoIncrement = 1;

  // Constructor to initialize the user with various attributes
  constructor(
    _name,
    _firstName,
    _lastName,
    _phone,
    _email,
    _roleId,
    _password,
    _address,
    _imgPath
  ) {
    this.ID = User.#autoIncrement++;  // Auto-increment user ID
    this.Name = _name;
    this.FirstName = _firstName;
    this.LastName = _lastName;
    this.Phone = _phone;
    this.Email = _email;
    this.RoleId = _roleId;
    this.Password = _password;
    this.Address = _address;
    this.ImgPath = _imgPath;
  }

  // Getters and setters with validation for various user attributes

  get ID() {
    return this.#id;
  }
  set ID(value) {
    if (value.constructor.name === "Number" && value > 0) {
      this.#id = value;
    } else {
      throw new Error("Invalid ID. ID must be a positive integer.");
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

  // Similar setters and getters for other attributes like FirstName, LastName, Phone, etc.

  // Method to convert the user object into JSON format
  toJSON() {
    return {
      ID: this.ID,
      Name: this.Name,
      FirstName: this.FirstName,
      LastName: this.LastName,
      Phone: this.Phone,
      Email: this.Email,
      RoleId: this.RoleId,
      Address: this.Address,
      ImgPath: this.ImgPath,
    };
  }
}
