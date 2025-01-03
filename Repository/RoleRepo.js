import { Roles } from "../Config/Roles.js";
import { UsersRepo } from "./UsersRepo.js";

export class RoleRepo {
  static getAllRoles() {
    return JSON.stringify(localStorage.getItem("Roles"));
  }

  static saveRoles(roles) {
    localStorage.setItem("Roles", JSON.stringify(roles));
  }

  static getRoleById(id) {
    const roles = JSON.parse(localStorage.getItem("Roles"));
    return roles.find((role) => role.id === id);
  }

  static deleteRole(id) {
    const roles = JSON.parse(localStorage.getItem("Roles"));
    const updatedRoles = roles.filter((role) => role.id !== id);
    localStorage.setItem("Roles", JSON.stringify(updatedRoles));
  }

  static isSeller(id) {
    const userRole = UsersRepo.getRoleByUserId(id);
    console.log(userRole);
    return userRole && userRole.name === Roles.SELLER;
  }
}
