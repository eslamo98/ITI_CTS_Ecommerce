import { UsersRepo } from "../Repository/UsersRepo.js";
import { User } from "../Models/User.js";

export class UsersController {
    signUp() {
        let name = document.getElementById("name").value;
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (UsersRepo.validateEmail(email) == "email is exist already") {
            alert("email is exist already");
        } else if (UsersRepo.validatePhone(phone) == "phone is exist already") {
            alert("phone is exist already");
        } else {
            let user = new User(name, firstName, lastName, phone, email, 1, password, address, "./images/Users/avatar.png");
            UsersRepo.saveUser(user);
            alert("user added successfully");
        }
    }
}
