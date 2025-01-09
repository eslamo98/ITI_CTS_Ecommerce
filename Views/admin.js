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
  const contentArea = document.getElementById("content");
  if (!contentArea) return; // Ensure contentArea exists

  if (section === "dashboard") {
    contentArea.innerHTML = ``;
  } else if (section === "products") {
    contentArea.innerHTML = `
      <div class="container my-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0 me-3">Products</h2>
          <div class="d-flex align-items-center">
            <button class="btn btn-add-product me-2" data-bs-toggle="modal" data-bs-target="#addProductModal">
              <i class="bi bi-plus"></i>
            </button>
            <button class="btn btn-light me-2"><i class="bi bi-bell"></i></button>
            <button class="btn btn-light"><i class="bi bi-person-circle"></i></button>
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

      <!-- Add Product Modal -->
      <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addProductModalLabel">Add Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="addProductForm">
                <!-- Product Name and Product Price in the same row -->
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="productName" class="form-label">Product Name</label>
                    <input type="text" class="form-control" id="productName" required>
                  </div>
                  <div class="col-md-6">
                    <label for="productPrice" class="form-label">Product Price</label>
                    <input type="number" class="form-control" id="productPrice" required>
                  </div>
                </div>

                <!-- Product Description and Product Category in the same row -->
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="productDescription" class="form-label">Product Description</label>
                    <textarea class="form-control" id="productDescription" rows="1" required></textarea>
                  </div>
                  <div class="col-md-6">
                    <label for="productCategory" class="form-label">Product Category</label>
                    <select class="form-select" id="productCategory" required>
                      <option value="All">All</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothes">Clothes</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Test">Test</option>
                    </select>
                  </div>
                </div>

                <!-- Product Quantity -->
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="productQuantity" class="form-label">Product Quantity</label>
                    <input type="number" class="form-control" id="productQuantity" value="1" min="1" step="1" required>
                  </div>
                  <div class="col-md-6">
                    <label for="productImage" class="form-label">Product Image</label>
                    <input type="file" class="form-control" id="productImage" accept="image/*">
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="saveProductBtn">Save Product</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Product Modal -->
      <div class="modal fade" id="deleteProductModal" tabindex="-1" aria-labelledby="deleteProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteProductModalLabel">Delete Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this product? This action cannot be undone.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Product Modal -->
      <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editProductModalLabel">Edit Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="editProductForm">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="editProductName" class="form-label">Product Name</label>
                    <input type="text" class="form-control" id="editProductName" required>
                  </div>
                  <div class="col-md-6">
                    <label for="editProductPrice" class="form-label">Product Price</label>
                    <input type="number" class="form-control" id="editProductPrice" required min="0" step="1">
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="editProductDescription" class="form-label">Product Description</label>
                    <textarea class="form-control" id="editProductDescription" rows="1" required></textarea>
                  </div>
                  <div class="col-md-6">
                    <label for="editProductCategory" class="form-label">Product Category</label>
                    <select class="form-select" id="editProductCategory" required>
                      <option value="All">All</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothes">Clothes</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Test">Test</option>
                    </select>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="editProductQuantity" class="form-label">Product Quantity</label>
                    <input type="number" class="form-control" id="editProductQuantity" value="1" min="1" step="1" required>
                  </div>
                  <div class="col-md-6">
                    <label for="editProductImage" class="form-label">Product Image</label>
                    <input type="file" class="form-control" id="editProductImage" accept="image/*">
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="saveEditProductBtn">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Now fetch and render the products after content is loaded
    const products = ProductRepo.GetAllProducts();
    renderProductsTable(products);

    const saveProductBtn = document.getElementById("saveProductBtn");
    if (saveProductBtn) {
      saveProductBtn.addEventListener("click", saveProduct);
    }
  } else if (section === "orders") {
    contentArea.innerHTML = ``;
  } else if (section === "transactions") {
    contentArea.innerHTML = ``;
  } else if (section === "users") {
    contentArea.innerHTML = ``;
  } else if (section === "profile") {
    contentArea.innerHTML = ``;
  } else if (section === "home") {
    window.location.href = "../../index.html";
  }
}

//--------------------------------------------------------------------------------------------------------

// Update active link
function updateActiveLink(activeLink) {
  document.querySelectorAll(".nav-link").forEach((link) => {
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
    const productImg = await IndexedDBRepo.getById(
      ImgsTables.productImg,
      product.id
    );
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
    let imgSrc = await ProductRepo.getProductImgSrcByProductId(product.id);

    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td><img src="${imgSrc}" width="50" alt="${product.name}"></td>
         <td style="min-width: 150px">
          <div class="d-flex">
            <button class="btn btn-primary btn-sm me-2 edit_btn" data-productid="${
              product.id
            }">Edit</button>
            <button class="btn btn-danger btn-sm delete_btn" data-productid="${
              product.id
            }">Delete</button>
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

  DbRepo.setUpLocalStorage();
  // Fetch and render products dynamically
  const products = ProductRepo.GetAllProducts();
  renderProductsTable(products);

  // Check if the user is logged in and if their roleId is 1
  // protectRoute();

  // Add event listener for the confirm delete button
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-productid");
      ProductRepo.deleteProduct(productId);
      renderProductsTable(ProductRepo.GetAllProducts());
      // Hide the delete modal
      const deleteModal = bootstrap.Modal.getInstance(
        document.getElementById("deleteProductModal")
      );
      deleteModal.hide();
    });
  }
});

// --------------------------------------------------------------------------------------------------------

// Add event listener for the save product button

function showEditModal(productId) {
  console.log(`Showing edit modal for product ID: ${productId}`);
  const product = ProductRepo.GetProductById(productId);
  if (!product) return; // Ensure product exists
  document.getElementById("editProductName").value = product.name;
  document.getElementById("editProductPrice").value = product.price;
  document.getElementById("editProductDescription").value = product.description;
  document.getElementById("editProductCategory").value = product.categoryID;
  document.getElementById("editProductQuantity").value = product.quantity;
  document.getElementById("editProductImage").value = ""; // Clear the image input
  // Show the edit modal
  const editModal = new bootstrap.Modal(
    document.getElementById("editProductModal"),
    {
      backdrop: "static",
      keyboard: false,
    }
  );
  editModal.show();
}

// Add event listener for the save edit product button

function showDeleteModal(productId) {
  // Set the product ID to a hidden input or data attribute
  document
    .getElementById("confirmDeleteBtn")
    .setAttribute("data-productid", productId);
  // Show the delete modal
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteProductModal")
  );
  deleteModal.show();
}

// Add event listener for the confirm delete button
document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", (event) => {
    const productId = event.currentTarget.getAttribute("data-productid");
    ProductRepo.deleteProduct(productId);
    renderProductsTable(ProductRepo.GetAllProducts());
    // Hide the delete modal
    const deleteModal = bootstrap.Modal.getInstance(
      document.getElementById("deleteProductModal")
    );
    deleteModal.hide();
  });

//--------------------------------------------------------------------------------------------------------

// Check if the user is logged in and if their roleId is 1
// function protectRoute() {

//     if (!loggedUser || loggedUser.roleId !== 1) {
//       // Redirect to the Unauthorized page if not logged in or roleId isn't 1
//       window.location.href = '../../index.html';
//     }
//   }

//   // Protect the admin page by calling protectRoute when the page loads
//   protectRoute();
