// import { loggedUser } from "./constants.js";
import { loggedUser } from "../../Config/Constants.js";

// navbar element
const navbar = document.querySelector(".navbar");

// create icon and dropdown list
const createUserDropdown = () => {
  return `
    <div class="dropdown me-5 ">
      <a href="#" class="btn dropdown-toggle" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-duotone fa-solid fa-user"></i> 
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
    </div>
  `;
};

// add user icon if there is a user logged in
if (loggedUser) {
  const userDropdown = createUserDropdown();
  navbar.insertAdjacentHTML("beforeend", userDropdown);
}
