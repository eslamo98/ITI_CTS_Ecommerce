import { UsersRepo } from "../Repository/UsersRepo.js";
import { User } from "../Models/User.js";
import { Helpers } from "../Utils/Helpers.js";
export class UsersController {
    signUp() {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let role = document.getElementById("role").value;
        let roleId;
        if(role=="user"){
            roleId=2;
        }
        else {
            roleId=3;
        }
        

        if (UsersRepo.validateEmail(email) == "email is exist already") {
            alert("email is exist already");
        } else if (UsersRepo.validatePhone(phone) == "phone is exist already") {
            alert("phone is exist already");
        } else {
            let user = new User(firstName, lastName, phone, email, roleId, password, address, "./images/Users/avatar.png");
            UsersRepo.saveUser(user);
            alert("user added successfully");
        }
    }
    logIn() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let user = UsersRepo.getUserByEmail(email);
        if (user == null) {
            alert("email is not exist");
        } 
        else if (user.password != password) {
            alert("password is incorrect");
        } else {
            Helpers.saveCurrentUser(user);
            alert("login successfully");
            window.location.href = "index.html";
        }
    }
}
