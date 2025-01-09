export class User {
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

  static #autoIncrement = 1;

  constructor(
    _name,
    _firstName,
    _lastName,
    _phone,
    _email,
    _roleId,
    _password,
    _address,
    _imgPath,
    _id = User.#autoIncrement++
  ) {
    this.#id = _id;
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

  get ID() {
    return this.#id;
  }
  set ID(value) {
    if (Number.isInteger(value)) {
      this.#id = value;
    } else {
      throw new Error("Invalid ID. ID must be a positive integer.");
    }
  }

  get Name() {
    return this.#name;
  }
  set Name(value) {
    if (value.trim() !== "") {
      this.#name = value;
    } else {
      throw new Error("Invalid name. Name must be a non-empty string.");
    }
  }

  get FirstName() {
    return this.#firstName;
  }
  set FirstName(value) {
    if (value.trim() !== "") {
      this.#firstName = value;
    } else {
      throw new Error(
        "Invalid first name. First name must be a non-empty string."
      );
    }
  }

  get LastName() {
    return this.#lastName;
  }
  set LastName(value) {
    if (value.trim() !== "") {
      this.#lastName = value;
    } else {
      throw new Error(
        "Invalid last name. Last name must be a non-empty string."
      );
    }
  }

  get Phone() {
    return this.#phone;
  }
  set Phone(value) {
    this.#phone = value;
  }

  get Email() {
    return this.#email;
  }
  set Email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.constructor.name === "String" && emailRegex.test(value)) {
      this.#email = value;
    } else {
      throw new Error("Invalid email. Please provide a valid email address.");
    }
  }

  get RoleId() {
    return this.#roleId;
  }
  set RoleId(value) {
    if (value.constructor.name === "Number" && value > 0) {
      this.#roleId = value;
    } else {
      throw new Error("Invalid role ID. Role ID must be a positive number.");
    }
  }

  get Password() {
    return this.#password;
  }
  set Password(value) {
    if (value.constructor.name === "String" && value.trim().length >= 6) {
      this.#password = value;
    } else {
      throw new Error(
        "Invalid password. Password must be at least 6 characters long."
      );
    }
  }

  get Address() {
    return this.#address;
  }
  set Address(value) {
    if (value && value.constructor.name === "Address") {
      this.#address = value;
    } else {
      throw new Error(
        "Invalid address. Address must include street, city, state, zipCode, and country."
      );
    }
  }

  get ImgPath() {
    return this.#imgPath;
  }

  set ImgPath(value) {
    this.#imgPath = value;
  }

  toJSON() {
    return {
      id: this.ID,
      name: this.Name,
      firstName: this.FirstName,
      lastName: this.LastName,
      phone: this.Phone,
      email: this.Email,
      roleId: this.RoleId,
      password: this.#password,
      address: this.Address,
      imgPath: this.ImgPath,
    };
  }
}
