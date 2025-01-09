import { Roles } from "../Config/Roles.js"; // Importing roles configuration
import { UsersRepo } from "./UsersRepo.js"; // Importing UsersRepo to fetch user data

export class RoleRepo {
  // Retrieves all roles from localStorage and returns them as a JSON string.
  static getAllRoles() {
    return JSON.parse(localStorage.getItem("Roles"));
  }

  // Saves the given roles array to localStorage under the "Roles" key.
  static saveRoles(roles) {
    localStorage.setItem("Roles", JSON.stringify(roles)); // Store roles in localStorage as a JSON string
  }

  // Retrieves a specific role by its ID from localStorage.
  static getRoleById(id) {
    const roles = JSON.parse(localStorage.getItem("Roles")); // Parse roles from localStorage
    return roles.find((role) => role.id === id); // Find and return the role with the matching ID
  }

  // Deletes a role from localStorage based on the provided role ID.
  static deleteRole(id) {
    const roles = JSON.parse(localStorage.getItem("Roles")); // Parse roles from localStorage
    const updatedRoles = roles.filter((role) => role.id !== id); // Filter out the role to be deleted
    localStorage.setItem("Roles", JSON.stringify(updatedRoles)); // Save the updated roles back to localStorage
  }

  // Checks if a user with a given ID is a seller.
  // Fetches the user's role using UsersRepo and compares it with the 'SELLER' role.
  static isSeller(roleId) {
    const userRole = this.getAllRoles().find((role) => role.id === roleId);
    // Get the user's role from UsersRepo
    console.log(userRole); // Log the user role (for debugging purposes)
    return userRole && userRole.name === Roles.SELLER; // Return true if the role is 'SELLER'
  }

  static isAdmin(roleId) {
    const userRole = this.getAllRoles().find((role) => role.id === roleId);
    // Get the user's role from UsersRepo
    console.log(userRole); // Log the user role (for debugging purposes)
    return userRole && userRole.name === Roles.ADMIN; // Return true if the role is 'SELLER'
  }

  static isCustomer(roleId) {
    const userRole = this.getAllRoles().find((role) => role.id === roleId);
    // Get the user's role from UsersRepo
    console.log(userRole); // Log the user role (for debugging purposes)
    return userRole && userRole.name === Roles.CUSTOMER; // Return true if the role is 'SELLER'
  }
}
