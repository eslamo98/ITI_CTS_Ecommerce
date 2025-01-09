import { DbRepo } from "../Repository/DbRepo.js"; // Adjust the path if necessary
import { ProductRepo } from "../Repository/ProductRepo.js";
import { OrderRepo } from "../Repository/OrderRepo.js";
import { RoleRepo } from "../Repository/RoleRepo.js";
import { CountryRepo } from "../Repository/CountryRepo.js";
import { UsersRepo } from "../Repository/UsersRepo.js";
import { CategoryRepo } from "../Repository/CategoryRepo.js";
import { IndexedDBRepo } from "../Repository/IndexedDBRepo.js";

import { loggedUser } from "../Config/Constants.js";
import { OrderStatus } from "../Config/OrderStatus.js";
import { ImgsTables } from "../Config/ImgsTables.js";

import { Helpers } from "../Utils/Helpers.js";
import { Product } from "../Models/Product.js";

// Define saveProduct function
function saveProduct() {
  // Implement the logic to save the product
  console.log("Save product function called");
}

// Load content function
function loadContent(section) {
  const contentArea = document.getElementById('content');
  if (!contentArea) return; // Ensure contentArea exists

  if (section === 'dashboard') {
    contentArea.innerHTML = ``;
  }

  else if (section === 'products') {
    contentArea.innerHTML = `
      <div class="container my-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0 me-3">Products</h2>
          <div class="d-flex align-items-center">
            <button class="btn btn-add-product me-2" data-bs-toggle="modal" data-bs-target="#addProductModal">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>

        <div class="d-flex justify-content-between mb-3">
          <div class="input-group w-25">
            <input type="text" class="form-control" placeholder="Search...">
          </div>
          <div>
            <select class="form-select w-auto">
              <option selected>Status: All</option>
              <option value="available">Available</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <table class="table table-hover align-middle bg-white table-rounded">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="productTable">
            <!-- Rows will be added dynamically -->
          </tbody>
        </table>
      </div>
    `;

    // Now fetch and render the products after content is loaded
    const products = ProductRepo.GetAllProducts();
    renderProductsTable(products);

    const saveProductBtn = document.getElementById("saveProductBtn");
    if (saveProductBtn) {
      saveProductBtn.addEventListener("click", saveProduct);
    }
  }

  else if (section === 'orders') {
    contentArea.innerHTML = `
      <div class="container my-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0 me-3">Orders</h2>
          <div class="d-flex align-items-center">
            <button class="btn btn-add-product me-2" data-bs-toggle="modal" data-bs-target="#addOrderModal" style="background-color: #DB4444;">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>

        <div class="d-flex justify-content-between mb-3">
          <div class="input-group w-25">
            <input type="text" class="form-control" placeholder="Search...">
          </div>
          <div>
            <select class="form-select w-auto">
              <option selected>Status: All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <table class="table table-hover align-middle bg-white table-rounded">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="orderTable">
            <!-- Rows will be added dynamically -->
          </tbody>
        </table>
      </div>
    `;

    // Now fetch and render the orders after content is loaded
    const orders = OrderRepo.getAllOrders();
    renderOrdersTable(orders);

    const saveOrderBtn = document.getElementById("saveOrderBtn");
    if (saveOrderBtn) {
      saveOrderBtn.addEventListener("click", saveOrder);
    }
  }

  else if (section === 'accounts') {
    contentArea.innerHTML = `
      <div class="container my-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0 me-3">Accounts</h2>
          <div class="d-flex align-items-center">
            <button class="btn btn-add-product me-2" data-bs-toggle="modal" data-bs-target="#addUserModal" style="background-color: #DB4444;">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>

        <div class="d-flex justify-content-between mb-3">
          <div class="input-group w-25">
            <input type="text" class="form-control" placeholder="Search...">
          </div>
          <div>
            <select class="form-select w-auto">
              <option selected>Status: All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <table class="table table-hover align-middle bg-white table-rounded">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="accountTable">
            <!-- Rows will be added dynamically -->
          </tbody>
        </table>
      </div>
    `;

    // Now fetch and render the accounts after content is loaded
    const users = UsersRepo.getAllUsers();
    renderAccountsTable(users);
  }

  else if (section === 'transactions') {
    contentArea.innerHTML = ``;
  }

  else if (section === 'users') {
    contentArea.innerHTML = ``;
  }

  else if (section === 'profile') {
    contentArea.innerHTML = `
      <div class="container my-5">
        <h2 class="text-center mb-4">Profile</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <form id="profileForm">
                  <div class="mb-3 text-center">
                    <img src="${loggedUser.imgPath || '../images/default-profile.png'}" class="rounded-circle mb-3" alt="Profile Picture" width="150">
                    <input type="file" class="form-control" id="profileImage">
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="profileFirstName" class="form-label">First Name</label>
                      <input type="text" class="form-control" id="profileFirstName" value="${loggedUser.firstName || ''}">
                    </div>
                    <div class="col-md-6">
                      <label for="profileLastName" class="form-label">Last Name</label>
                      <input type="text" class="form-control" id="profileLastName" value="${loggedUser.lastName || ''}">
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="profilePhone" class="form-label">Phone</label>
                    <input type="text" class="form-control" id="profilePhone" value="${loggedUser.phone}">
                  </div>
                  <div class="mb-3">
                    <label for="profileEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="profileEmail" value="${loggedUser.email}">
                  </div>
                  <div class="mb-3">
                    <label for="profileStreet" class="form-label">Street</label>
                    <input type="text" class="form-control" id="profileStreet" value="${loggedUser.address?.street || ''}">
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="profileCity" class="form-label">City</label>
                      <input type="text" class="form-control" id="profileCity" value="${loggedUser.address?.city || ''}">
                    </div>
                    <div class="col-md-6">
                      <label for="profileState" class="form-label">State</label>
                      <input type="text" class="form-control" id="profileState" value="${loggedUser.address?.state || ''}">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="profileZipCode" class="form-label">Zip Code</label>
                      <input type="text" class="form-control" id="profileZipCode" value="${loggedUser.address?.zipCode || ''}">
                    </div>
                    <div class="col-md-6">
                      <label for="profileCountry" class="form-label">Country</label>
                      <input type="text" class="form-control" id="profileCountry" value="${loggedUser.address?.country || ''}">
                    </div>
                  </div>
                  <button type="button" class="btn btn-primary w-100" id="saveProfileBtn">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('saveProfileBtn').addEventListener('click', async () => {
      const updatedUser = {
        ...loggedUser,
        firstName: document.getElementById('profileFirstName').value,
        lastName: document.getElementById('profileLastName').value,
        phone: document.getElementById('profilePhone').value,
        email: document.getElementById('profileEmail').value,
        address: {
          street: document.getElementById('profileStreet').value,
          city: document.getElementById('profileCity').value,
          state: document.getElementById('profileState').value,
          zipCode: document.getElementById('profileZipCode').value,
          country: document.getElementById('profileCountry').value
        }
      };

      const profileImageInput = document.getElementById('profileImage');
      if (profileImageInput.files.length > 0) {
        updatedUser.imgPath = await saveImg(loggedUser.id, 'profileImage', ImgsTables.usersImg);
      }

      UsersRepo.updateUser(loggedUser.id, updatedUser);
      UsersRepo.updateLoggedUserData(updatedUser);

      // Update the user in the users object in local storage
      const users = UsersRepo.getAllUsers();
      const userIndex = users.findIndex(user => user.id === loggedUser.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        UsersRepo.saveUsers(users);
      }

      alert('Profile updated successfully!');
    });
  }

  else if (section === 'home') {
    window.location.href = '../../index.html';
  }
}

//--------------------------------------------------------------------------------------------------------

// Update active link
function updateActiveLink(activeLink) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
  });
  activeLink.classList.add("active");
}

// --------------------------------------------------------------------------------------------------------

// getting the product image from the IndexedDB

async function getProductImgSrc(product) {
  if (product.imgPath) {
    return product.imgPath; // Use imgPath if available
  } else {
    // Fetch the image from IndexedDB
    const productImg = await IndexedDBRepo.getById(ImgsTables.productImg, product.id);
    return productImg?.imgBinary || "../images/default-image.png"; // Fallback to a default image
  }
}

// --------------------------------------------------------------------------------------------------------

// Searching for products
  let searchProductInput = document.getElementById("productsearch");
  if (searchProductInput) {
    searchProductInput.addEventListener("input", function (event) {
      const searchTerm = event.target.value.toLowerCase();
      const filteredProducts = ProductRepo.filterProductsByName(
        searchTerm,
        loggedUser.id
      );
      renderProductsTable(filteredProducts);
    });
  }

// --------------------------------------------------------------------------------------------------------

  // Render products table

  async function renderProductsTable(products) {
    let productTable = document.getElementById("productTable");
    if (!productTable) return; // Ensure productTable exists
    productTable.innerHTML = ""; // Clear the table
  
    for (const product of products) {
      const row = document.createElement("tr");
      let imgSrc = await getProductImgSrc(product);
  
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td><img src="${imgSrc}" width="50" alt="${product.name}"></td>
         <td style="min-width: 150px">
          <div class="d-flex">
            <button class="btn btn-primary btn-sm me-2 edit_btn" data-productid="${product.id}">Edit</button>
            <button class="btn btn-danger btn-sm delete_btn" data-productid="${product.id}">Delete</button>
          </div>
        </td>
      `;
      productTable.appendChild(row);
    }

    // Add event listeners for edit and delete buttons
    document.querySelectorAll(".edit_btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.currentTarget.getAttribute("data-productid");
            console.log(`Edit button clicked for product ID: ${productId}`);
            showEditModal(productId);
        });
    });

    document.querySelectorAll(".delete_btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.currentTarget.getAttribute("data-productid");
            console.log(`Delete button clicked for product ID: ${productId}`);
            showDeleteModal(productId);
        });
    });
}

// --------------------------------------------------------------------------------------------------------

// Render orders table
async function renderOrdersTable(orders) {
  let orderTable = document.getElementById("orderTable");
  if (!orderTable) return; // Ensure orderTable exists
  orderTable.innerHTML = ""; // Clear the table

  for (const order of orders) {
    const customer = UsersRepo.getUserById(order.userId).name;
    const items = order.totalAmount;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${order.id}</td>
      <td>${customer}</td>
      <td>${items}</td>
      <td>$${order.totalPrice.toFixed(2)}</td>
      <td class="order-status"><span class="status-badge ${getStatusClass(order.status)}">${order.status}</span></td>
      <td style="min-width: 150px">
        <div class="d-flex">
          <button class="btn btn-secondary btn-sm me-2 details-order-btn" data-orderid="${order.id}" data-bs-toggle="modal" data-bs-target="#orderDetailsModal">Details</button>
          <button class="btn btn-danger btn-sm delete-order-btn" data-orderid="${order.id}">Delete</button>
        </div>
      </td>
    `;
    orderTable.appendChild(row);
  }

  // Add event listeners for details and delete buttons
  document.querySelectorAll(".details-order-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const orderId = event.currentTarget.getAttribute("data-orderid");
      console.log(`Details button clicked for order ID: ${orderId}`);
      showOrderDetailsModal(orderId);
    });
  });

  document.querySelectorAll(".delete-order-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const orderId = event.currentTarget.getAttribute("data-orderid");
      console.log(`Delete button clicked for order ID: ${orderId}`);
      showDeleteOrderModal(orderId);
    });
  });
}

// Get status class
function getStatusClass(status) {
  switch (status) {
    case 'Delivered':
      return 'status-delivered';
    case 'Pending':
      return 'status-pending';
    case 'Shipped':
      return 'status-shipped';
    case 'Cancelled':
      return 'status-cancelled';
    default:
      return '';
  }
}

// Show order details modal
function showOrderDetailsModal(orderId) {
  console.log(`Showing details modal for order ID: ${orderId}`);
  const orders = JSON.parse(localStorage.getItem('Orders')) || [];
  const order = orders.find(order => order.id === parseInt(orderId));
  if (!order) return; // Ensure order exists

  document.getElementById('orderDate').textContent = order.orderDate;
  document.getElementById('orderId').textContent = order.id;
  const orderProducts = document.getElementById('orderProducts');
  orderProducts.innerHTML = ''; // Clear previous products

  order.cartItems.forEach(item => {
    const product = ProductRepo.GetProductById(item.productId);
    const productRow = document.createElement('div');
    productRow.classList.add('row', 'mb-3', 'bg-light', 'p-2');
    productRow.innerHTML = `
      <div class="col-md-6">${product.name}</div>
      <div class="col-md-3">${item.quantity}</div>
      <div class="col-md-3">$${item.totalPrice.toFixed(2)}</div>
    `;
    orderProducts.appendChild(productRow);
  });

  const orderDetailsModal = new bootstrap.Modal(document.getElementById('orderDetailsModal'), {
    backdrop: 'static',
    keyboard: false
  });
  orderDetailsModal.show();
}

// Show delete order modal
function showDeleteOrderModal(orderId) {
  // Set the order ID to a hidden input or data attribute
  document.getElementById("confirmDeleteOrderBtn").setAttribute("data-orderid", orderId);
  // Show the delete modal
  const deleteOrderModal = new bootstrap.Modal(document.getElementById("deleteOrderModal"));
  deleteOrderModal.show();
}

// Add event listener for the confirm delete order button
document.getElementById("confirmDeleteOrderBtn").addEventListener("click", (event) => {
  const orderId = parseInt(document.getElementById("confirmDeleteOrderBtn").getAttribute("data-orderid"));
  OrderRepo.deleteOrder(orderId);
  renderOrdersTable(OrderRepo.getAllOrders());
  // Hide the delete modal
  const deleteOrderModal = bootstrap.Modal.getInstance(document.getElementById("deleteOrderModal"));
  deleteOrderModal.hide();
});

// Add event listener for the save order button
document.getElementById("saveOrderBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  if (validateAddOrderForm()) {
    const orders = OrderRepo.getAllOrders();
    const lastOrderId = orders.length > 0 ? orders[orders.length - 1].id : 0;
    const newOrderId = lastOrderId + 1;

    const order = {
      id: newOrderId,
      customer: document.getElementById("orderCustomer").value,
      items: document.getElementById("orderItems").value,
      totalPrice: parseFloat(document.getElementById("orderTotalPrice").value),
      status: document.getElementById("orderStatus").value
    };
    OrderRepo.addOrder(order);
    renderOrdersTable(OrderRepo.getAllOrders());
    bootstrap.Modal.getInstance(document.getElementById("addOrderModal")).hide();
  }
});

// Validate add order form
function validateAddOrderForm() {
  const customer = document.getElementById("orderCustomer").value.trim();
  const items = document.getElementById("orderItems").value.trim();
  const totalPrice = document.getElementById("orderTotalPrice").value.trim();
  const status = document.getElementById("orderStatus").value.trim();

  if (!customer || !items || !totalPrice || !status) {
    alert("Please fill in all fields.");
    return false;
  }

  if (isNaN(totalPrice) || parseFloat(totalPrice) <= 0) {
    alert("Please enter a valid total price.");
    return false;
  }

  if (isNaN(items) || parseInt(items) <= 0) {
    alert("Please enter a valid number of items.");
    return false;
  }

  return true;
}

//--------------------------------------------------------------------------------------------------------

// Render accounts table
function renderAccountsTable(users) {
  let accountTable = document.getElementById("accountTable");
  if (!accountTable) return; // Ensure accountTable exists
  accountTable.innerHTML = ""; // Clear the table

  for (const user of users) {
    const row = document.createElement("tr");

    const role = user.roleId === 1 ? "Admin" : user.roleId === 2 ? "Seller" : "Customer";

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.password}</td>
      <td>${role}</td>
      <td style="min-width: 150px">
        <button class="btn btn-primary btn-sm me-2 edit-user-btn" data-userid="${user.id}">Edit</button>
        <button class="btn btn-danger btn-sm delete-user-btn" data-userid="${user.id}">Delete</button>
      </td>
    `;
    accountTable.appendChild(row);
  }

  // Add event listeners for edit and delete buttons
  document.querySelectorAll(".edit-user-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const userId = event.currentTarget.getAttribute("data-userid");
      showEditUserModal(userId);
    });
  });

  document.querySelectorAll(".delete-user-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const userId = event.currentTarget.getAttribute("data-userid");
      showDeleteUserModal(userId);
    });
  });
}

//--------------------------------------------------------------------------------------------------------

// Event Listeners for clicking on nav links or on the Add Product Modal

document.addEventListener("DOMContentLoaded", () => {
  // Load default content
  loadContent("dashboard");

  // Add event listeners to nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const section = event.currentTarget.getAttribute("data-section");
      loadContent(section);
      updateActiveLink(event.currentTarget);
    });
  });

  // Add event listener for the sign out link
  document.getElementById("signOutLink").addEventListener("click", (event) => {
    event.preventDefault();
    UsersRepo.logout();
    window.location.href = "../../index.html";
  });

  DbRepo.setUpLocalStorage();
  // Fetch and render products dynamically
  const products = ProductRepo.GetAllProducts();
  renderProductsTable(products);

  // Fetch and render users dynamically
  const users = UsersRepo.getAllUsers();
  renderAccountsTable(users);

  // Check if the user is logged in and if their roleId is 1
  protectRoute();

  // Add event listener for the confirm delete button
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", (event) => {
      const productId = parseInt(document.getElementById("confirmDeleteBtn").getAttribute("data-productid"));
      ProductRepo.deleteProduct(productId);
      renderProductsTable(ProductRepo.GetAllProducts());
      // Hide the delete modal
      const deleteModal = bootstrap.Modal.getInstance(document.getElementById("deleteProductModal"));
      deleteModal.hide();
    });
  }

  // Add event listener for the save product button
  document.getElementById("saveProductBtn").addEventListener("click", async (e) => {
    e.preventDefault();
    if (validateAddProductForm()) {
      const products = ProductRepo.GetAllProducts();
      const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
      const newProductId = lastProductId + 1;

      const product = {
        id: newProductId,
        name: document.getElementById("productName").value,
        price: parseFloat(document.getElementById("productPrice").value),
        description: document.getElementById("productDescription").value,
        categoryID: document.getElementById("productCategory").value,
        quantity: parseInt(document.getElementById("productQuantity").value),
        imgPath: await saveImg(newProductId, "productImage", ImgsTables.productImg)
      };
      ProductRepo.addProduct(product);
      renderProductsTable(ProductRepo.GetAllProducts());
      bootstrap.Modal.getInstance(document.getElementById("addProductModal")).hide();
    }
  });

  // Add event listener for the save edit product button
  document.getElementById("saveEditProductBtn").addEventListener("click", async (e) => {
    e.preventDefault();
    const productId = parseInt(document.getElementById("editProductForm").getAttribute("data-productid"));
    const product = ProductRepo.GetProductById(productId);
    product.name = document.getElementById("editProductName").value;
    product.price = parseFloat(document.getElementById("editProductPrice").value);
    product.description = document.getElementById("editProductDescription").value;
    product.categoryID = document.getElementById("editProductCategory").value;
    product.quantity = parseInt(document.getElementById("editProductQuantity").value);
    product.imgPath = await saveImg(productId, "editProductImage", ImgsTables.productImg);
    ProductRepo.updateProduct(productId, product);
    renderProductsTable(ProductRepo.GetAllProducts());
    bootstrap.Modal.getInstance(document.getElementById("editProductModal")).hide();
  });

  // Add event listener for the confirm delete button
  document.getElementById("confirmDeleteBtn").addEventListener("click", (e) => {
    const productId = parseInt(document.getElementById("confirmDeleteBtn").getAttribute("data-productid"));
    ProductRepo.deleteProduct(productId);
    renderProductsTable(ProductRepo.GetAllProducts());
    bootstrap.Modal.getInstance(document.getElementById("deleteProductModal")).hide();
  });

  // Add event listeners for edit buttons
  document.querySelectorAll(".edit_btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-productid");
      console.log(`Edit button clicked for product ID: ${productId}`);
      showEditModal(productId);
    });
  });
});

// --------------------------------------------------------------------------------------------------------

// Add event listener for the save product button

function showEditModal(productId) {
  console.log(`Showing edit modal for product ID: ${productId}`);
  const product = ProductRepo.GetProductById(productId);
  if (!product) return; // Ensure product exists
  document.getElementById("editProductForm").setAttribute("data-productid", productId);
  document.getElementById("editProductName").value = product.name;
  document.getElementById("editProductPrice").value = product.price;
  document.getElementById("editProductDescription").value = product.description;
  document.getElementById("editProductCategory").value = product.categoryID;
  document.getElementById("editProductQuantity").value = product.quantity;
  document.getElementById("editProductImage").value = ""; // Clear the image input
  // Show the edit modal
  const editModal = new bootstrap.Modal(document.getElementById("editProductModal"), {
    backdrop: 'static',
    keyboard: false
  });
  editModal.show();
}

// Add event listener for the save edit product button

function showDeleteModal(productId) {
    // Set the product ID to a hidden input or data attribute
    document.getElementById("confirmDeleteBtn").setAttribute("data-productid", productId);
    // Show the delete modal
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteProductModal"));
    deleteModal.show();
}



// Add event listener for the confirm delete button
document.getElementById("confirmDeleteBtn").addEventListener("click", (event) => {
    const productId = parseInt(document.getElementById("confirmDeleteBtn").getAttribute("data-productid"));
    ProductRepo.deleteProduct(productId);
    renderProductsTable(ProductRepo.GetAllProducts());
    // Hide the delete modal
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById("deleteProductModal"));
    deleteModal.hide();
});



//--------------------------------------------------------------------------------------------------------

// Check if the user is logged in and if their roleId is 1
function protectRoute() {
  
    if (!loggedUser || loggedUser.roleId !== 1) {
      // Redirect to the Unauthorized page if not logged in or roleId isn't 1
      window.location.href = '../../index.html';
    }
  }
  
  // Protect the admin page by calling protectRoute when the page loads
  protectRoute();

//--------------------------------------------------------------------------------------------------------

// Save image in IndexedDB
async function saveImg(tableKey, imageInputId, tableName) {
  const fileInput = document.getElementById(imageInputId);
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        const imgBinary = e.target.result;

        try {
          // Save image in IndexedDB
          const newImageId = await IndexedDBRepo.update(tableName, tableKey, {
            imgBinary,
            tableKey,
          });
          fileInput.value = ""; // Clear the file input
          resolve(true);
        } catch (error) {
          console.error("Failed to save image:", error);
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  } else {
    return Promise.resolve(); // No file to upload, resolve the promise
  }
}

// Validate add product form
function validateAddProductForm() {
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const description = document.getElementById("productDescription").value.trim();
  const category = document.getElementById("productCategory").value.trim();
  const quantity = document.getElementById("productQuantity").value.trim();
  const image = document.getElementById("productImage").files.length;

  if (!name || !price || !description || !category || !quantity || !image) {
    alert("Please fill in all fields and select an image.");
    return false;
  }

  if (isNaN(price) || isNaN(quantity) || parseFloat(price) <= 0 || parseInt(quantity) <= 0) {
    alert("Please enter valid price and quantity values.");
    return false;
  }

  return true;
}

// Show edit user modal
function showEditUserModal(userId) {
  const user = UsersRepo.getUserById(userId);
  if (!user) return; // Ensure user exists

  document.getElementById('editUserId').value = user.id;
  document.getElementById('editUserName').value = user.name;
  document.getElementById('editUserEmail').value = user.email;
  document.getElementById('editUserPhone').value = user.phone;
  document.getElementById('editUserPassword').value = user.password;
  document.getElementById('editUserRole').value = user.roleId;

  const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
  editUserModal.show();
}

// Show delete user modal
function showDeleteUserModal(userId) {
  document.getElementById('confirmDeleteUserBtn').setAttribute('data-userid', userId);
  const deleteUserModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
  document.getElementById('deleteUserModal').removeAttribute('aria-hidden'); // Remove aria-hidden attribute
  deleteUserModal.show();
}

// Add event listener for the save edit user button
document.getElementById('saveEditUserBtn').addEventListener('click', () => {
  const userId = document.getElementById('editUserId').value;
  const updatedUser = {
    id: userId,
    name: document.getElementById('editUserName').value,
    email: document.getElementById('editUserEmail').value,
    phone: document.getElementById('editUserPhone').value,
    password: document.getElementById('editUserPassword').value,
    roleId: document.getElementById('editUserRole').value
  };

  UsersRepo.updateUser(updatedUser);
  renderAccountsTable(UsersRepo.getAllUsers());
  const editUserModal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
  editUserModal.hide();
});

// Add event listener for the confirm delete user button
document.getElementById('confirmDeleteUserBtn').addEventListener('click', () => {
  const userId = parseInt(document.getElementById('confirmDeleteUserBtn').getAttribute('data-userid'));
  UsersRepo.deleteUser(userId);
  renderAccountsTable(UsersRepo.getAllUsers());
  const deleteUserModal = bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
  deleteUserModal.hide();
});

// Ensure UsersRepo.deleteUser is correctly implemented
UsersRepo.deleteUser = function(userId) {
  const users = JSON.parse(localStorage.getItem('Users')) || [];
  const updatedUsers = users.filter(user => user.id !== userId);
  localStorage.setItem('Users', JSON.stringify(updatedUsers));
};
