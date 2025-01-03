import { Roles } from "../Config/Roles.js";
import { User } from "../Models/User.js";
import { CategoryRepo } from "./CategoryRepo.js";
import { ProductRepo } from "./ProductRepo.js";
import { RoleRepo } from "./RoleRepo.js";


let usersArray = [];
fetch('../Data/Users.json')
  .then(response => response.json())
  .then(arr => {
    usersArray = arr;
  })
  .catch(error => {
    console.error('Error fetching the JSON file:', error);
  });

export class UsersRepo {


  /* This method retrieves the logged user data from localStorage by the given session key.
  It uses `localStorage.getItem()` to fetch the data, and `JSON.parse()` to convert it 
  from a string back to its original object format.  */

  static getLoggedUserDataBySessionKey(sessionKey) {
    return JSON.parse(localStorage.getItem(sessionKey));
  }


  /*
  This method saves a list of users to localStorage.
  It stores the users in `localStorage` under the key "users" after converting them 
  to a JSON string using `JSON.stringify()`.
  */ 

  static saveUser(user) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  static validateEmail(email) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return "email is exist already";
      }
    }
    return "Exist";
  }

  static validatePhone(phone) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].phone === phone) {
        return "phone is exist already";
      }
    }
    return "Exist";
  }

  /*
   This method retrieves all users stored in localStorage under the key "users".
   If no users are found, it defaults to returning an empty array.
  */ 

  static getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  static getUserById(userId) {
    const users = this.getUsers();
    return users.find((user) => user.id === userId);
  }

  static getAllSellerProducts(sellerId) {
    console.log(RoleRepo.isSeller(sellerId), sellerId);
    if (RoleRepo.isSeller(sellerId)) {
      let allProducts = ProductRepo.GetAllProducts();
      console.log(allProducts);
      return allProducts.filter((product) => product.sellerId === sellerId);
    } else {
      return [];
    }
  }

  static getRoleByUserId(id) {
    const user = UsersRepo.getUserById(id);
    console.log(user, id);
    if (user) {
      return RoleRepo.getRoleById(user.roleId);
    } else {
      return null;
    }
  }
}
