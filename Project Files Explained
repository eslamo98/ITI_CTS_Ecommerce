### 📁Config
 📄**Constants.js**
- This file is designed to manage the logged-in user state and user data using `localStorage`.
-  The key (`"loggedUserData"`) is used to store and retrieve the logged-in user’s information in **localStorage**.
- When the user logs in, their data (such as user ID, name, email, etc.) is typically stored in **localStorage** under this key.
- Later, when the application needs to know about the logged-in user (e.g., to show user-specific content), it can use this session key to fetch the stored data.

---

### 📁Controllers
##### 📄**ProductsController.js**
- This file acts as a controller to access product information.
-  **ProductsController** is a class responsible for providing a clean interface to interact with product data. It calls methods in the **ProductRepo** to fetch products or specific product details.


---

### 📁Data
##### 📄**Categories.json**
- Contains product categories and associated sellers.
- Each object includes:  `id`  `name`    `sellerId`

##### 📄**Countries.json**
- Contains a list of countries with their respective country codes.
- Each object includes:  `name`  `code`

##### 📄**Orders.json**
- Stores the details of user orders, each object represents an order placed by a user.
- Each object includes:  `id`  `userId`   `orderDate`  `status`  `totalAmount ` `products` `shippingAddress`  `paymentInfo `


##### 📄**PaymentInformation.json**
- This file contains the available payment methods for processing orders.
- Each object includes:  `id`  `method`

##### 📄**Products.json**
- This file contains product details.
- Each object includes:  `id`  `name`  `price` `quantity`  `description` `categoryId` `imgPath`

##### 📄**Roles.json**
- This file contains the different user roles available on the platform.
- Each object includes:  `id`  `name`

##### 📄**ShippingAddress.json**
- This file contains the shipping addresses associated with users.
- Each object includes:  `id`  `street`  `city`  `state ` `zipCode`  `country ` `userId` 


##### 📄**ShoppingCart.json**
- This file contains the shopping cart information for users.
- Each object includes:  `cartId`  `userId ` `items`  `totalItems ` `totalPrice`

##### 📄**Users.json**
- This file contains information about the users.
- Each object includes:  `id`  `name ` `firstName`  `lastName ` `phone`  `email ` `roleId`  `password ` `address` 


---
### 📁Dom
##### 📄 **test.js**
- Contains `UpdateUi` function.
- The `UpdateUi` function is a very simple utility for modifying an element's style dynamically in JavaScript. It allows you to update the **CSS properties** of any element on the page by referencing its `id`. It's useful for things like interactive UI changes, animations, or responding to user events (e.g., changing styles when a button is clicked).

----

### 📁Images
- Contains all the images used in the project.

---


### 📁Models
 ##### 📄**Category.js**
- Manages product categories with an auto-incremented ID and ensures valid category names.

##### 📄**Country.js**
- Represents a country with name and code, allowing their retrieval and modification.

##### 📄**Order.js**
- Handles customer orders with details like products, shipping address, payment, and order status.


##### 📄**Product.js**
- This file contains the available payment methods for processing orders.
- Each object includes:  `id`  `method`

##### 📄**Role.js**
- Defines user roles with an auto-incremented ID and validates role names, preventing direct ID modification.

##### 📄**ShoppingCart.js**
- Manages a shopping cart, including the cart's items, total price, and item count.


##### 📄**ShoppingCartItem.js**
- Represents an individual item in the shopping cart with product details, quantity, and price.


##### 📄**User.js**
- Represents a user with personal details, login credentials, role, and address.

##### 📄**Address.js**
- Represents a user's address with fields for street, city, state, zip code, and country, including validation and methods for formatted string and JSON conversion.

---
### 📁Repository

 ##### 📄**AddressRepo.js**
- This file manages the CRUD operations for address data stored in `localStorage`. It provides methods to get all addresses, save, add, update, and delete an address by its ID. The goal is to facilitate address-related data handling in a persistent manner using `localStorage`.

##### 📄**CategoryRepo.js**
- This file handles the CRUD operations for category data in `localStorage`. It allows retrieving all categories, adding, updating, deleting, and searching categories by ID or name. The goal is to manage category information persistently using `localStorage`.

##### 📄**CountryRepo.js**
- This file manages country-related data stored in `localStorage`. It provides functionality to get all countries, add, update, delete, and save country data. The purpose is to handle and persist country information using `localStorage`.


##### 📄**DbRepo.js**
- Manages the setup and seeding of `localStorage` with predefined data for categories, products, users, roles, countries, and shopping carts.
- `SeedLocalStorage()` populates the `localStorage` with sample data, including categories, products, roles, users, and shopping carts.
- `setUpLocalStorage()` ensures the seed data is added only once by checking an index stored in `localStorage`. If it hasn't been seeded, it calls `SeedLocalStorage()` and saves the index.

##### 📄**OrderRepo.js**
- Manages order data in localStorage, providing methods to get, save, add, and remove orders.
- `getAllOrders()` retrieves all orders, and `saveOrders()` stores them.
- `addOrder()` adds a new order, while `removeOrder()` deletes an order by its ID.

##### 📄**PaymentMethodRepo.js**
- Manages payment methods in localStorage with methods to get, save, add, update, and delete payment methods.
- `getAllPaymentMethodRepo()` returns all payment methods, and `savePayments()` saves updated data.
- `isValidPaymentMethod()` checks if a specific payment method already exists.


##### 📄**ProductRepo.js**
- Handles product data in localStorage with methods to get, save, add, update, delete, and filter products.
- `GetAllProducts()` retrieves all products, and `saveProducts()` stores them back to localStorage.
- `filterProductsByName()` filters products by name, and `getProductImgPathById()` retrieves a product's image path if it exists.


##### 📄**RoleRepo.js**
- Manages role data in `localStorage` with methods to get, save, and delete roles.
- `getRoleById()` retrieves a role by its ID, and `deleteRole()` removes a role by its ID.
- `isSeller()` checks if a user has the "Seller" role based on their ID.

##### 📄**ShoppingCartRepo.js**
- Manages shopping cart data in `localStorage` with methods to get all carts, save them, and retrieve a specific cart by ID.
- `addItem()` adds or updates an item in a shopping cart, and `removeItem()` deletes an item from a cart.
- `saveShopingCarts()` saves updated shopping cart data back to `localStorage`.


##### 📄**UsersRepo.js**
- Manages user data, including retrieving logged-in users and saving a list of users to `localStorage`.
- `getAllSellerProducts()` returns all products of a seller by filtering products based on the seller’s ID.
- `getRoleByUserId()` fetches the role of a user based on their ID using the `RoleRepo`.

---
### 📁Utils
 ##### 📄**Helpers.js**
- Provides utility methods for common validation tasks (e.g., checking if a number is positive or negative).
- Includes checks for specific formats such as email, phone numbers, and string content (letters only, non-empty).
- Simplifies validation logic across the application by offering reusable validation functions.
