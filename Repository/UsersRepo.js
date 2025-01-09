import { Roles } from "../Config/Roles.js";
import { User } from "../Models/User.js";
import { CategoryRepo } from "./CategoryRepo.js";
import { ProductRepo } from "./ProductRepo.js";
import { RoleRepo } from "./RoleRepo.js";
import { userLoggedSessionKey } from "../Config/Constants.js";
import { IndexedDBRepo } from "./IndexedDBRepo.js";
import { ImgsTables } from "../Config/ImgsTables.js";

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

  static saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
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

  static updateUser(userId, updatedUser) {
    const users = this.getUsers();
    const index = users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      users[index] = updatedUser;
      this.saveUsers(users);
      return true;
    } else {
      return false;
    }
  }

  static deleteUser(userId) {
    const users = this.getUsers();
    const updatedUsers = users.filter(user => user.id !== userId);
    this.saveUsers(updatedUsers);
  }

  static getAllSellerProducts(sellerId) {
    console.log(RoleRepo.isSeller(sellerId), sellerId);
    if (RoleRepo.isSeller(sellerId)) {
      let allProducts = ProductRepo.GetAllProducts();
      return allProducts.filter((product) => product.sellerId === sellerId);
    } else {
      return [];
    }
  }

  static getSellerLowQtyProducts(sellerId, qty) {
    const sellerProducts = this.getAllSellerProducts(sellerId);
    return sellerProducts.filter((product) => product.quantity <= qty);
  }

  static getRoleByUserId(id) {
    const user = UsersRepo.getUserById(id);
    if (user) {
      return RoleRepo.getRoleById(user.roleId);
    } else {
      return null;
    }
  }

  static updateLoggedUserData(user) {
    localStorage.setItem(userLoggedSessionKey, JSON.stringify(user));
  }

  static logout() {
    localStorage.removeItem(userLoggedSessionKey);
    window.location.href = "/index.html";
  }

  static async getUserImgSrcByUserId(userId) {
    const user = UsersRepo.getUserById(userId);
    if (user) {
      if (user.imgPath) {
        return user.imgPath; // Use imgPath if available
      } else {
        // Fetch the image from IndexedDB
        const userImg = await IndexedDBRepo.getById(
          ImgsTables.usersImg,
          user.id
        );

        return userImg?.imgBinary || "default-image-path.png"; // Fallback to a default image
      }
    }
  }

  static getAllUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
  }
}
