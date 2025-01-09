// Importing the UsersRepo class to interact with localStorage for user-related data
// import { UsersRepo } from "../Repository/UsersRepo.js";
import { UsersRepo } from "../Repository/UsersRepo.js";

// A constant key used to store and retrieve the logged user data from localStorage
export const userLoggedSessionKey = "loggedUserData";

/* Try to retrieve the logged user data from localStorage using the session key.
   If no data is found, use the default user object instead.*/
export let loggedUser =
  // UsersRepo.getLoggedUserDataBySessionKey(
  //   userLoggedSessionKey
  // ) ||
  {
    id: 2,
    name: "John Doe",
    firstName: "first name",
    lastName: "last name",
    phone: 1234567,
    email: "john.doe@example.com",
    roleId: 2,
    password: "645yuyub",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "U.S.A",
    },
    imgPath: "Images/Users/abigailr.jpg",
  };

// A constant API key related to countries (although its usage is not defined in this code)
export const countriesApiKey = "4JsaxIpiYmkgpGmHxmRgXIR1t4n8Du84Wq6WSWdU";

/*  ----------------------------File Summary-------------------------------

- This file is designed to manage the logged-in user state and user data using `localStorage`.
-  The key (`"loggedUserData"`) is used to store and retrieve the logged-in user’s information in **localStorage**.
- When the user logs in, their data (such as user ID, name, email, etc.) is typically stored in **localStorage** under this key.
- Later, when the application needs to know about the logged-in user (e.g., to show user-specific content), it can use this session key to fetch the stored data.

*/
