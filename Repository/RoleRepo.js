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
}
