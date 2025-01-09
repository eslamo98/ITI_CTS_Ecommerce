import { loggedUser } from "../../Config/Constants.js";
import { ProductRepo } from "../../Repository/ProductRepo.js";
import { UsersRepo } from "../../Repository/UsersRepo.js";
import { CategoryRepo } from "../../Repository/CategoryRepo.js";
import { Helpers } from "../../Utils/Helpers.js";
import { IndexedDBRepo } from "../../Repository/IndexedDBRepo.js";
import { ImgsTables } from "../../Config/ImgsTables.js";
import { Product } from "../../Models/Product.js";
import { OrderStatus } from "../../Config/OrderStatus.js";
import { OrderRepo } from "../../Repository/OrderRepo.js";
import { RoleRepo } from "../../Repository/RoleRepo.js";
import { CountryRepo } from "../../Repository/CountryRepo.js";
import { User } from "../../Models/User.js";
import { Address } from "../../Models/Address.js";

// if (loggedUser) {
//   console.log(loggedUser);
//   if (!RoleRepo.isSeller(loggedUser.id)) {
//     // Redirect to home page
//     alert("You don't have access");
//     window.location.href = "/";
//   }
// } else {
//   // Redirect to login page
//   alert("You need to login to access this page");
//   window.location.href = "login.html";
// }

let content = document.getElementById("content");
let MainContent = document.getElementById("MainContent");
let mainHeader = document.createElement("header");
// create form elements
let createForm = document.getElementById("createForm");
let createCloseBtn = document.querySelector("#createProductModal .btn-close");

let createProductName = document.getElementById("createProductName");
let createProductPrice = document.getElementById("createProductPrice");
let createProductDesc = document.getElementById("createProductDesc");
let createProductCategory = document.getElementById("createProductCategory");
let createProductImage = document.getElementById("createProductImage");
let createProductQty = document.getElementById("createProductQty");

let createSaveBtn = document.getElementById("createSaveBtn");

// edit form elements
let editForm = document.getElementById("editForm");
let editCloseBtn = document.querySelector("#staticBackdrop .btn-close");
let editProductName = document.getElementById("editProductName");
let editProductPrice = document.getElementById("editProductPrice");
let editProductDesc = document.getElementById("editProductDesc");
let editProductCategory = document.getElementById("editProductCategory");
let editProductImage = document.getElementById("editProductImage");
let editProductQty = document.getElementById("editProductQty");
let editSaveBtn = document.getElementById("editSaveBtn");

let userProfileImage = document.getElementById("userProfileImage");
let sellerName = document.getElementById("sellerName");
let logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", (e) => {
  UsersRepo.logout();
});

sellerName.innerText = loggedUser.firstName;
userProfileImage.src = await UsersRepo.getUserImgSrcByUserId(loggedUser.id);

function initCategories(categorySelectElement) {
  let allCategories = CategoryRepo.getAllCategories();
  ////console.log(allCategories);
  categorySelectElement.innerHTML = "";
  for (let i = 0; i < allCategories.length; i++) {
    let option = document.createElement("option");
    option.value = allCategories[i].id;
    option.text = allCategories[i].name;
    categorySelectElement.appendChild(option);
  }
}

initCategories(editProductCategory);
initCategories(createProductCategory);

mainHeader.classList.add(
  "d-flex",
  "justify-content-between",
  "align-items-center",
  "mb-4"
);

mainHeader.addEventListener("click", (e) => {
  if (
    e.target.nodeName === "BUTTON" &&
    e.target.classList.contains("create_new_product")
  ) {
    createLaunchBtn.click();
  }
});

let launchBtn = document.getElementById("launchBtn");
let createLaunchBtn = document.getElementById("createLaunchBtn");
let deleteConfirmBtn = document.getElementById("deleteConfirmBtn");
let confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
let noDeleteBtn = document.getElementById("noDeleteBtn");
let orderDetailLaunchBtn = document.getElementById("orderDetailLaunchBtn");
let launchDeleteOrderModalBtn = document.getElementById(
  "launchDeleteOrderModalBtn"
);
let confirmDeleteOrderBtn = document.getElementById("confirmDeleteOrderBtn");
let noDeleteOrderBtn = document.getElementById("noDeleteOrderBtn");

MainContent.addEventListener("click", async (e) => {
  //console.log(e.target);
  if (
    e.target.nodeName === "BUTTON" &&
    e.target.getAttribute("data-productId") &&
    e.target.classList.contains("edit_btn")
  ) {
    let productId = +e.target.getAttribute("data-productId");
    let product = ProductRepo.GetProductById(productId);
    editForm.setAttribute("data-productId", productId);
    editProductName.value = product.name;
    editProductPrice.value = product.price;
    editProductDesc.value = product.description;
    editProductCategory.value = product.categoryID;
    editProductImage.value = "";
    editProductQty.value = product.quantity;
    displayProductImg(
      await ProductRepo.getProductImgSrcByProductId(product.id)
    );
    ////console.log(product);
    launchBtn.click();
    // Populate edit form with product details
  } else if (
    e.target.nodeName === "BUTTON" &&
    e.target.getAttribute("data-productId") &&
    e.target.classList.contains("delete_btn")
  ) {
    let productId = +e.target.getAttribute("data-productId");
    //console.log(productId);

    deleteConfirmBtn.click();
    confirmDeleteBtn.addEventListener("click", async (e) => {
      ProductRepo.deleteProduct(productId);
      await renderProductsTable(UsersRepo.getAllSellerProducts(loggedUser));
      IndexedDBRepo.delete(ImgsTables.productImg, productId);
      noDeleteBtn.click();
    });
  } else if (
    e.target.nodeName === "BUTTON" &&
    e.target.getAttribute("data-orderId") &&
    e.target.classList.contains("details_btn")
  ) {
    let orderId = +e.target.getAttribute("data-orderId");
    renderOrder(OrderRepo.getSellerOrderById(orderId, loggedUser.id));
    orderDetailLaunchBtn.click();
  } else if (
    e.target.nodeName === "BUTTON" &&
    e.target.getAttribute("data-orderId") &&
    e.target.classList.contains("cancel_btn")
  ) {
    let orderId = +e.target.getAttribute("data-orderId");
    let order = OrderRepo.getSellerOrderById(orderId, loggedUser.id);

    order.status = OrderStatus.CANCELLED;
    OrderRepo.updateOrder(orderId, order);
    if (OrderRepo.updateOrder(orderId, order)) {
      for (let i = 0; i < order.cartItems.length; i++) {
        ProductRepo.updateProductQuantity(
          order.cartItems[i].productId,
          order.cartItems[i].quantity
        );
      }
      renderOrdersTable(OrderRepo.getAllSellerOrders(loggedUser.id));
    }
  } else if (
    e.target.nodeName === "BUTTON" &&
    e.target.getAttribute("data-orderId") &&
    e.target.classList.contains("delete_btn")
  ) {
    let orderId = +e.target.getAttribute("data-orderId");
    //console.log(orderId);

    launchDeleteOrderModalBtn.click();
    confirmDeleteOrderBtn.addEventListener("click", (e) => {
      OrderRepo.deleteSellerOrder(loggedUser.id, orderId);
      renderOrdersTable(OrderRepo.getAllSellerOrders(loggedUser.id));
      noDeleteOrderBtn.click();
    });
  }
});

editSaveBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // Prevent form submission

  let productId = +editForm.getAttribute("data-productId");
  let product = ProductRepo.GetProductById(productId);

  // Update product details
  product.name = editProductName.value;
  product.price = parseFloat(editProductPrice.value);
  product.description = editProductDesc.value;
  product.categoryID = parseInt(editProductCategory.value);
  product.quantity = parseInt(editProductQty.value);
  if (
    (await saveImg(productId, "editProductImage", ImgsTables.productImg)) ===
    true
  ) {
    product.imgPath = null; // Image path will be handled via IndexedDB
  }

  // Save the updated image and product

  ProductRepo.updateProduct(productId, product);

  editCloseBtn.click();
  // Re-render the products table after updates
  const products = UsersRepo.getAllSellerProducts(loggedUser);
  await renderProductsTable(products);
});

createSaveBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // Prevent form submission

  let product = new Product(
    createProductName.value,
    parseFloat(createProductPrice.value),
    createProductQty.value,
    createProductDesc.value,
    parseInt(createProductCategory.value),

    null, // Image path will be handled via IndexedDB
    loggedUser.id
  );

  // Save the updated image and product
  await saveImg(product.ID, "createProductImage", ImgsTables.productImg); // Ensure the image is saved before updating UI
  ProductRepo.addProduct(product);

  // reset inputs of the form
  createProductName.value = "";
  createProductPrice.value = "";
  createProductDesc.value = "";
  createProductCategory.value = "";
  createProductImage.value = "";
  createProductQty.value = "";
  document.getElementById("createproductImagePreview").src = "";

  createCloseBtn.click();
  // Re-render the products table after updates
  const products = UsersRepo.getAllSellerProducts(loggedUser);
  await renderProductsTable(products);
});

let homeLink = document.getElementById("homelink");

homeLink.addEventListener("click", function (event) {
  // headerTitle.innerHTML = "Home";
});

let dashboardlink = document.getElementById("dashboardlink");

dashboardlink.addEventListener("click", async function (event) {
  // headerTitle.innerHTML = "Dashboard";
  mainHeader.innerHTML = `
  <h2 class="m-0">Dashboard</h2>
  <div class="header-icons">
    <button class="btn btn-light"><i class="bi bi-bell"></i></button>
    <button class="btn btn-light">
      <i class="bi bi-person-circle"></i>
    </button>
  </div>`;
  content.insertAdjacentElement("afterbegin", mainHeader);

  MainContent.innerHTML = `<!-- First Row -->
          <div class="row mb-4">
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <div class="data-container">
                    <div class="text-section">
                      <p class="title">Total Orders</p>
                      <p class="duration">Last 7 days</p>
                      <p class="amount">25.7K</p>
                      <p class="change">
                        <span class="arrow up">↑</span>
                        <span class="percentage up">6%</span> vs last 7 days
                      </p>
                    </div>
                    <div class="graph-section">
                      <svg
                        class="graph"
                        viewBox="0 0 100 60"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0,40 Q25,20 50,30 T100,20"
                          stroke="green"
                          fill="none"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <div class="data-container">
                    <div class="text-section">
                      <p class="title">Total Orders</p>
                      <p class="duration">Last 7 days</p>
                      <p class="amount">25.7K</p>
                      <p class="change">
                        <span class="arrow up">↑</span>
                        <span class="percentage up">6%</span> vs last 7 days
                      </p>
                    </div>
                    <div class="graph-section">
                      <svg
                        class="graph"
                        viewBox="0 0 100 60"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0,40 Q25,20 50,30 T100,20"
                          stroke="green"
                          fill="none"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <!-- Second Row -->
          <div class="row">
            <div class="col-12 text-center d-flex justify-content-between">
              <h3>Low Products</h3>
              <select id="filterQty" class="form-control form-select my_qty_select">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="60">60</option>
              </select>
            </div>
            <table class="table table-striped table-hover">
              <thead class="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Categotry</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Img</th>
                </tr>
              </thead>
              <tbody id="lowQuantityProductsTable">
                <!-- Dynamic rows will be added here -->
              </tbody>
            </table>
          </div>
           `;

  await renderLowProductsTable(
    UsersRepo.getSellerLowQtyProducts(loggedUser.id, 10)
  );

  let qtySelect = document.querySelector(".my_qty_select");
  qtySelect.addEventListener("change", async function (e) {
    console.log(qtySelect.value);
    await renderLowProductsTable(
      UsersRepo.getSellerLowQtyProducts(loggedUser.id, e.target.value)
    );
  });
});

async function renderLowProductsTable(products) {
  let productTable = document.getElementById("lowQuantityProductsTable");
  productTable.innerHTML = ""; // Clear the table

  for (const product of products) {
    const row = document.createElement("tr");
    let imgSrc = await ProductRepo.getProductImgSrcByProductId(product.id);

    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${ProductRepo.getCategoryNameByProductId(product.id)}</td>
      <td>${product.quantity}</td>
      <td><img src="${imgSrc}" width="50" alt="${product.name}"></td>
      
    `;
    productTable.appendChild(row);
  }
}

let orderslink = document.getElementById("orderslink");

orderslink.addEventListener("click", function (event) {
  mainHeader.innerHTML = `
          <h2 class="m-0">Dashboard</h2>
          <button class="btn btn-success create_order" >Order</button>
          <input type="text" class="form-control" style="width: 150px; height: 30px" id="ordersearch" placeholder="Search...">
          <div class="header-icons">
            <button class="btn btn-light"><i class="bi bi-bell"></i></button>
            <button class="btn btn-light">
              <i class="bi bi-person-circle"></i>
            </button>
          </div>`;
  content.insertAdjacentElement("afterbegin", mainHeader);
  let headerTitle = content.querySelector("h2");

  headerTitle.innerHTML = "Orders";

  MainContent.innerHTML = `
  <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Customer</th>
          <th scope="col">Items</th>
          <th scope="col">Total Price</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody id="orderTable">
        <!-- Dynamic rows will be added here -->
      </tbody>
    </table>
  `;

  const sellerOrders = OrderRepo.getAllSellerOrders(loggedUser.id);
  Helpers.myConsole(sellerOrders, "seller orders");
  //create table of orders using bootstrap table
  ////console.log(sellerOrders);
  renderOrdersTable(sellerOrders);
  // populate table with sellerOrders data

  let searchOrderInput = document.getElementById("ordersearch");
  if (searchOrderInput) {
    searchOrderInput.addEventListener("input", function (event) {
      const searchTerm = event.target.value.toLowerCase();
      const filteredOrders = sellerOrders.filter((order) =>
        UsersRepo.getUserById(order.userId)
          .name.toLowerCase()
          .includes(searchTerm)
      );
      renderOrdersTable(filteredOrders);
    });
  }
});

let productslink = document.getElementById("productslink");

productslink.addEventListener("click", async function (event) {
  mainHeader.innerHTML = `
          <h2 class="m-0">Dashboard</h2>
          <button class="btn btn-success create_new_product" >Add Product</button>
          <input type="text" class="form-control" style="width: 150px; height: 30px" id="productsearch" placeholder="Search...">
          <div class="header-icons">
            <button class="btn btn-light"><i class="bi bi-bell"></i></button>
            <button class="btn btn-light">
              <i class="bi bi-person-circle"></i>
            </button>
          </div>`;
  content.insertAdjacentElement("afterbegin", mainHeader);
  let headerTitle = content.querySelector("h2");

  headerTitle.innerHTML = "Products";

  MainContent.innerHTML = `
  <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Image</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody id="productTable">
        <!-- Dynamic rows will be added here -->
      </tbody>
    </table>
  `;

  const sellerProducts = UsersRepo.getAllSellerProducts(loggedUser);
  //create table of products using bootstrap table
  Helpers.myConsole(loggedUser, "Seller Products");
  await renderProductsTable(sellerProducts);
  // populate table with sellerProducts data

  let searchProductInput = document.getElementById("productsearch");
  if (searchProductInput) {
    searchProductInput.addEventListener("input", async function (event) {
      const searchTerm = event.target.value.toLowerCase();
      const filteredProducts = ProductRepo.filterProductsByName(
        searchTerm,
        loggedUser.id
      );
      await renderProductsTable(filteredProducts);
    });
  }
});

function editProduct(id) {
  // Implement the edit product functionality
  ////console.log(ProductRepo.GetProductById(id));
  launchBtn.click();
}

async function renderProductsTable(products) {
  Helpers.myConsole(products, "from render table");
  let productTable = document.getElementById("productTable");
  productTable.innerHTML = ""; // Clear the table

  for (const product of products) {
    const row = document.createElement("tr");
    let imgSrc = await ProductRepo.getProductImgSrcByProductId(product.id);

    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>${product.quantity}</td>
      <td><img src="${imgSrc}" width="50" alt="${product.name}"></td>
      <td style="min-width: 150px">
        <button class="btn btn-primary btn-sm me-2 edit_btn" data-productId="${
          product.id
        }">Edit</button>
        <button class="btn btn-danger btn-sm delete_btn"  data-productId="${
          product.id
        }">Delete</button>
      </td>
    `;
    productTable.appendChild(row);
  }
}

function renderOrder(order) {
  let orderDate = document.getElementById("order_date");
  let orderNo = document.getElementById("order_no");
  let orderItems = document.getElementById("order_items");
  let orderTotalPrice = document.getElementById("order_total_price");

  orderDate.innerHTML = Helpers.formatDate(order.orderDate);
  orderNo.innerHTML = `#${order.id}`;
  orderItems.innerHTML = "";
  for (let i = 0; i < order.cartItems.length; i++) {
    orderItems.innerHTML += `<div class="row">
                            <div class="col-md-8">
                              <p
                                data-bs-toggle="tooltip"
                                data-bs-placement="left"
                                title="${
                                  ProductRepo.GetProductById(
                                    order.cartItems[i].productId
                                  ).name
                                }"
                                class="truncated-text"
                                style="width: 100px"
                              >
                              ${
                                ProductRepo.GetProductById(
                                  order.cartItems[i].productId
                                ).name
                              }
                              </p>
                            </div>
                            <div class="col-md-2 col-lg-2">x${
                              order.cartItems[i].quantity
                            }</div>
                            <div class="col-md-2 col-lg-2">
                              <p>£${order.cartItems[i].totalPrice}</p>
                            </div>
                          </div>`;
  }
  orderTotalPrice.innerHTML = `$${order.totalPrice.toFixed(2)}`;
}

function renderOrdersTable(orders) {
  Helpers.myConsole(orders, "from render orders table");
  let orderTable = document.getElementById("orderTable");
  orderTable.innerHTML = ""; // Clear the table
  let filteredOrders = orders.filter((order) => order.cartItems.length > 0);
  for (const order of filteredOrders) {
    Helpers.myConsole(order, "from renderOrdersTable function");
    if (order.totalPrice > 0) {
      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${order.id}</td>
      <td>${UsersRepo.getUserById(order.userId).name}</td>
      <td>${order.cartItems.length}</td>
      <td>${order.totalPrice.toFixed(2)}</td>
      <td>${Helpers.GetPropperBadge(order.status)}</td>
      <td style="min-width: 150px">
        <button class="btn btn-primary btn-sm me-2 details_btn" data-orderId="${
          order.id
        }">Details</button>
         <button class="btn btn-secondary btn-sm cancel_btn"  data-orderId="${
           order.id
         }">Cancel</button>
        <!--<button class="btn btn-danger btn-sm delete_btn"  data-orderId="${
          order.id
        }">Delete</button>-->
      </td>
    `;
      orderTable.appendChild(row);
    }
  }
}

let customerslink = document.getElementById("customerslink");

customerslink.addEventListener("click", function (event) {
  // headerTitle.innerHTML = "Categories";
});

//register input file of the image for create form
document
  .getElementById("createProductImage")
  .addEventListener("change", (e) =>
    handleImageCange(e, "createproductImagePreview")
  );
//register input file of the image for edit form
document
  .getElementById("editProductImage")
  .addEventListener("change", (e) =>
    handleImageCange(e, "editproductImagePreview")
  );

function handleImageCange(e, previewImageId) {
  //console.log(e.target);
  //console.log(this);
  const file = e.target.files[0];
  const preview = document.getElementById(previewImageId);

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    preview.style.display = "none";
  }
}

function displayProductImg(imgSrc) {
  const preview = document.getElementById("editproductImagePreview");
  preview.src = imgSrc;
  preview.style.display = "block";
}

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
          // alert(`Image uploaded successfully with ID: ${newImageId}`);
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
    // alert("Please select an image to upload.");
    return Promise.resolve(); // No file to upload, resolve the promise
  }
}
let showProfileBtn = document.getElementById("showProfileBtn");
showProfileBtn.addEventListener("click", ShowProfile);

async function ShowProfile() {
  if (!loggedUser) return;
  let roles = RoleRepo.getAllRoles();
  //console.log(roles);
  let userSrc = await UsersRepo.getUserImgSrcByUserId(loggedUser.id);
  let rolesOptions = roles.map(
    (role) => `<option value="${role.id}">${role.name}</option>`
  );

  let countries = CountryRepo.getAllCountries();
  Helpers.myConsole(countries);
  let countriesOptions = countries.map(
    (country) => `<option value="${country.name}">${country.name}</option>`
  );

  let profileContainer = document.createElement("div");
  profileContainer.classList.add("container", "mt-5");
  profileContainer.addEventListener("click", async (e) => {
    if (e.target.nodeName === "INPUT" && e.target.id === "profileImageInput") {
      e.target.addEventListener("change", previewImage);
    } else if (
      e.target.nodeName === "BUTTON" &&
      e.target.id === "saveProfileData"
    ) {
      e.preventDefault();
      await saveProfileData();
    }
  });
  profileContainer.innerHTML = `
        <div class="form-container">
            <h2 class="form-title">Edit User Profile</h2>
            <form>
                <div class="text-center mb-4">
                    <img id="profileImage" src="${userSrc}" alt="Profile Image" class="profile-image border" style="border-radius: 50%; objict-fit: cover; object-position: center; width: 150px; height: 150px">
                    <div class="mt-2">
                        <label for="imgPath" class="form-label">Profile Image</label>
                        <input type="file"  class="form-control" accept="image/*" id="profileImageInput">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="name" class="form-label">Full Name</label>
                    <input type="text" id="name" class="form-control" value="${loggedUser.name}">
                </div>

                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <label for="firstName" class="form-label">First Name</label>
                        <input type="text" id="firstName" class="form-control" value="${loggedUser.firstName}">
                    </div>
                    <div class="col-md-6">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input type="text" id="lastName" class="form-control" value="${loggedUser.lastName}">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="text" id="phone" class="form-control" value="${loggedUser.phone}">
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" class="form-control" value="${loggedUser.email}">
                </div>

                <!--<div class="mb-3">
                    <label for="roleId" class="form-label">Role</label>
                    <select id="roleId" class="form-select">
                       ${rolesOptions}
                    </select>
                </div>-->

                <h4 class="mt-4">Address</h4>
                <div class="mb-3">
                    <label for="street" class="form-label">Street</label>
                    <input type="text" id="street" class="form-control" value="${loggedUser.address.street}">
                </div>

                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <label for="city" class="form-label">City</label>
                        <input type="text" id="city" class="form-control" value="${loggedUser.address.city}">
                    </div>
                    <div class="col-md-6">
                        <label for="state" class="form-label">State</label>
                        <input type="text" id="state" class="form-control" value="${loggedUser.address.state}">
                    </div>
                </div>

                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <label for="zipCode" class="form-label">Zip Code</label>
                        <input type="text" id="zipCode" class="form-control" value="${loggedUser.address.zipCode}">
                    </div>
                    <div class="col-md-6">
                        <label for="country" class="form-label">Country</label>
                        <select  id="country" class="form-control" value="${loggedUser.address.country}">${countriesOptions}</select>
                    </div>
                </div>

                <div class="text-center">
                    <button type="submit" class="btn btn-primary" id="saveProfileData">Save Changes</button>
                </div>
            </form>
        </div>

    `;

  mainHeader.innerHTML = "";
  MainContent.innerHTML = "";
  MainContent.appendChild(profileContainer);

  async function saveProfileData() {
    let name = document.getElementById("name").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    //let roleId = document.getElementById("roleId").value;
    let street = document.getElementById("street").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zipCode = document.getElementById("zipCode").value;
    let country = document.getElementById("country").value;
    let imgPath = loggedUser.imgPath;
    console.log({
      name,
      firstName,
      lastName,
      phone,
      email,
      street,
      city,
      state,
      zipCode,
      country,
      imgPath,
    });

    Helpers.myConsole(loggedUser);
    if (
      await saveImg(loggedUser.id, "profileImageInput", ImgsTables.usersImg)
    ) {
      let newUserData = new User(
        name,
        firstName,
        lastName,
        phone,
        email,
        loggedUser.roleId,
        loggedUser.password,
        new Address(street, city, state, zipCode, country),
        null,
        loggedUser.id
      );

      Helpers.myConsole(newUserData.toJSON(), "before saving");
      UsersRepo.updateUser(loggedUser.id, newUserData.toJSON());
      UsersRepo.updateLoggedUserData(newUserData.toJSON());
    } else {
      let newUserData = new User(
        name,
        firstName,
        lastName,
        phone,
        email,
        loggedUser.roleId,
        loggedUser.password,
        new Address(street, city, state, zipCode, country),
        imgPath,
        loggedUser.id
      );
      Helpers.myConsole(newUserData.toJSON(), "before saving");

      UsersRepo.updateUser(loggedUser.id, newUserData.toJSON());
    }
  }
}

function previewImage(event) {
  const output = document.getElementById("profileImage");
  output.src = URL.createObjectURL(event.target.files[0]);
}
