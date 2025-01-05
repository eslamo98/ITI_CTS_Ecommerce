import { loggedUser } from "../../Config/Constants.js";
import { ProductRepo } from "../../Repository/ProductRepo.js";
import { UsersRepo } from "../../Repository/UsersRepo.js";
import { CategoryRepo } from "../../Repository/CategoryRepo.js";
import { Helpers } from "../../Utils/Helpers.js";
import { IndexedDBRepo } from "../../Repository/IndexedDBRepo.js";
import { ImgsTables } from "../../Config/ImgsTables.js";
let content = document.getElementById("content");
let MainContent = document.getElementById("MainContent");
let mainHeader = document.createElement("header");

// create form elements
let createForm = document.getElementById("createForm");
let createProductName = document.getElementById("createProductName");
let createProductPrice = document.getElementById("createProductPrice");
let createProductDesc = document.getElementById("createProductDesc");
let createProductCategory = document.getElementById("createProductCategory");
let createProductImage = document.getElementById("createProductImage");
let createSaveBtn = document.getElementById("createSaveBtn");

// edit form elements
let editForm = document.getElementById("editForm");
let editProductName = document.getElementById("editProductName");
let editProductPrice = document.getElementById("editProductPrice");
let editProductDesc = document.getElementById("editProductDesc");
let editProductCategory = document.getElementById("editProductCategory");
let editProductImage = document.getElementById("editProductImage");
let editSaveBtn = document.getElementById("editSaveBtn");

function initCategories() {
  let allCategories = CategoryRepo.getAllCategories();
  //console.log(allCategories);
  editProductCategory.innerHTML = "";
  for (let i = 0; i < allCategories.length; i++) {
    let option = document.createElement("option");
    option.value = allCategories[i].id;
    option.text = allCategories[i].name;
    editProductCategory.appendChild(option);
  }
}

initCategories();

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

MainContent.addEventListener("click", async (e) => {
  console.log(e.target);
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
    displayProductImg(await getProductImgSrc(product));
    //console.log(product);
    launchBtn.click();
    // Populate edit form with product details
  } else if (
    e.target.nodeName === "BUTTON" &&
    e.target.getAttribute("data-productId") &&
    e.target.classList.contains("delete_btn")
  ) {
    let productId = +e.target.getAttribute("data-productId");
    console.log(productId);

    deleteConfirmBtn.click();
    confirmDeleteBtn.addEventListener("click", (e) => {
      ProductRepo.deleteProduct(productId);
      renderProductsTable(UsersRepo.getAllSellerProducts(loggedUser.id));
      IndexedDBRepo.delete(ImgsTables.productImg, productId);
      noDeleteBtn.click();
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
  product.imgPath = null; // Image path will be handled via IndexedDB

  // Save the updated image and product
  await saveImg(productId, "editProductImage"); // Ensure the image is saved before updating UI
  ProductRepo.updateProduct(productId, product);

  // Re-render the products table after updates
  const products = UsersRepo.getAllSellerProducts(loggedUser.id);
  await renderProductsTable(products);
});

createSaveBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // Prevent form submission

  // Update product details
  product.name = editProductName.value;
  product.price = parseFloat(editProductPrice.value);
  product.description = editProductDesc.value;
  product.categoryID = parseInt(editProductCategory.value);
  product.imgPath = null; // Image path will be handled via IndexedDB

  // Save the updated image and product
  await saveImg(productId, "editProductImage"); // Ensure the image is saved before updating UI
  ProductRepo.updateProduct(productId, product);

  // Re-render the products table after updates
  const products = UsersRepo.getAllSellerProducts(loggedUser.id);
  await renderProductsTable(products);
});

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

  const sellerProducts = UsersRepo.getAllSellerProducts(loggedUser.id);
  //create table of products using bootstrap table
  //console.log(sellerProducts);
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

function editProduct(id) {
  // Implement the edit product functionality
  //console.log(ProductRepo.GetProductById(id));
  launchBtn.click();
}

async function getProductImgSrc(product) {
  if (product.imgPath) {
    return product.imgPath; // Use imgPath if available
  } else {
    // Fetch the image from IndexedDB
    const productImg = await IndexedDBRepo.getById(
      ImgsTables.productImg,
      product.id
    );
    return productImg?.imgBinary || "default-image-path.png"; // Fallback to a default image
  }
}

async function renderProductsTable(products) {
  let productTable = document.getElementById("productTable");
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
  console.log(e.target);
  console.log(this);
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

async function saveImg(productId, imageInputId) {
  const fileInput = document.getElementById(imageInputId);
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        const imgBinary = e.target.result;

        try {
          // Save image in IndexedDB
          const newImageId = await IndexedDBRepo.update(
            ImgsTables.productImg,
            productId,
            {
              imgBinary,
              productId,
            }
          );
          alert(`Image uploaded successfully with ID: ${newImageId}`);
          fileInput.value = ""; // Clear the file input
          resolve();
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
