import { UsersRepo } from "../Repository/UsersRepo.js";

export const userLoggedSessionKey = "loggedUserData";
// if i want to get the logged user data i wil import this variable loggedUser
export let loggedUser = UsersRepo.getLoggedUserDataBySessionKey(
  userLoggedSessionKey
) || {
  id: 3,
  name: "John Doe",
  firstName: "first name",
  lastName: "last name",
  phone: 1234567,
  email: "john.doe@example.com",
  roleId: 1,
  password: "645yuyub",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "U.S.A",
  },
};

export const countriesApiKey = "4JsaxIpiYmkgpGmHxmRgXIR1t4n8Du84Wq6WSWdU";
