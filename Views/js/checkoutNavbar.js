// import { loggedUser } from "./constants.js";
import { loggedUser } from "../../Config/Constants.js";
import { DbRepo } from "../../Repository/DbRepo.js";
import { RoleRepo } from "../../Repository/RoleRepo.js";
import { UsersRepo } from "../../Repository/UsersRepo.js";

DbRepo.setUpLocalStorage();
// navbar element
const navbar = document.querySelector(".navbar");

let navbarNavUl = document.querySelector("#navbarNav ul");
// create icon and dropdown list
const createUserDropdown = async () => {
  if (loggedUser) {
    if (RoleRepo.isCustomer(loggedUser.roleId)) {
      let imgSrc = await UsersRepo.getUserImgSrcByUserId(loggedUser.id);

      let dropdownElement = document.createElement("div");
      dropdownElement.classList.add("dropdown", "me-5");

      dropdownElement.innerHTML = `
        
          <a href="#" class="btn dropdown-toggle" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src=${imgSrc} alt="user img" width="50" height="50" style="border-radius: 50%"/>
          </a>
          <ul class="dropdown-menu dropdown-menu-end bg-dark opacity-75" aria-labelledby="userDropdown">
            <li><a class="dropdown-item text-white hover-text-red" href="/profile">My Account</a></li>
            <li><a class="dropdown-item text-white hover-text-red" href="/settings">My Order</a></li>
            ${
              loggedUser.roleId === 1
                ? '<li><a class="dropdown-item text-white hover-text-red" href="/orders">Admin</a></li>'
                : ""
            }
            <li><a class="dropdown-item text-white hover-text-red" href="/logout">Logout</a></li>
          </ul>
        
      `;
      return dropdownElement;
    } else if (RoleRepo.isAdmin(loggedUser.roleId)) {
      let adminLi = document.createElement("li");
      adminLi.classList.add("nav-item", "ms-auto");
      adminLi.innerHTML = `
        <a class="nav-link  nav-link hover-text-red" href="/Views/admin.html">Admin</a>
      `;

      return adminLi;
    } else if (RoleRepo.isSeller(loggedUser.roleId)) {
      let sellerLi = document.createElement("li");
      sellerLi.classList.add("nav-item", "ms-auto");
      sellerLi.innerHTML = `
        <a class="nav-link  nav-link hover-text-red" href="/Views/sellerDashboard.html">Seller</a>
      `;

      return sellerLi;
    }
  } else {
    let loginLi = document.createElement("li");
    loginLi.classList.add("nav-item", "ms-auto");
    loginLi.innerHTML = `
      <a class="nav-link  nav-link hover-text-red" href="/login.html">Login</a>
    `;
  }
};

// add user icon if there is a user logged in
if (loggedUser) {
  if (RoleRepo.isAdmin(loggedUser.roleId)) {
    navbarNavUl.appendChild(await createUserDropdown());
  } else if (RoleRepo.isCustomer(loggedUser.roleId)) {
    navbarNavUl.appendChild(await createUserDropdown());
  } else {
    navbar.appendChild();
  }
} else {
  // add login link if there is no user logged in
  navbarNavUl.appendChild(await createUserDropdown());
}
