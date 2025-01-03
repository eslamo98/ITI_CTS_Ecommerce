import { loggedUser } from "../../Config/Constants.js";
import { ProductRepo } from "../../Repository/ProductRepo.js";
import { UsersRepo } from "../../Repository/UsersRepo.js";
let content = document.getElementById("content");
let MainContent = document.getElementById("MainContent");
let mainHeader = document.createElement("header");
mainHeader.classList.add(
  "d-flex",
  "justify-content-between",
  "align-items-center",
  "mb-4"
);

let homeLink = document.getElementById("homelink");

homeLink.addEventListener("click", function (event) {
  // headerTitle.innerHTML = "Home";
});

let dashboardlink = document.getElementById("dashboardlink");

dashboardlink.addEventListener("click", function (event) {
  // headerTitle.innerHTML = "Dashboard";
});

let orderslink = document.getElementById("orderslink");

orderslink.addEventListener("click", function (event) {
  // headerTitle.innerHTML = "Orders";
});

let productslink = document.getElementById("productslink");

productslink.addEventListener("click", function (event) {
  mainHeader.innerHTML = `
          <h2 class="m-0">Dashboard</h2>
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

  const sellerProducts = UsersRepo.getAllSellerProducts(loggedUser.id);
  //create table of products using bootstrap table
  console.log(sellerProducts);
  renderProductsTable(sellerProducts);
  // populate table with sellerProducts data

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
});

function renderProductsTable(products) {
  let productTable = document.getElementById("productTable");
  productTable.innerHTML = ""; // Clear the table
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>$${product.price.toFixed(2)}</td>
          <td>${product.quantity}</td>
          <td><img src="${product.imgPath}" width="50" alt="${
      product.Name
    }"></td>
          <td>
            <button class="btn btn-primary btn-sm me-2" onclick="editProduct(${
              product.id
            })">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${
              product.id
            })">Delete</button>
          </td>
        `;
    productTable.appendChild(row);
  });
}

let customerslink = document.getElementById("customerslink");

customerslink.addEventListener("click", function (event) {
  // headerTitle.innerHTML = "Categories";
});
