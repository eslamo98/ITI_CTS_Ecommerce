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
}
