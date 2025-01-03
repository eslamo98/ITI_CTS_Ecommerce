import { Roles } from "../Config/Roles.js";
import { User } from "../Models/User.js";
import { CategoryRepo } from "./CategoryRepo.js";
import { ProductRepo } from "./ProductRepo.js";
import { RoleRepo } from "./RoleRepo.js";

export class UsersRepo {
  static getLoggedUserDataBySessionKey(sessionKey) {
    return JSON.parse(localStorage.getItem(sessionKey));
  }

  static saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

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
