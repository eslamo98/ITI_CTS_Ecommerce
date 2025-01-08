import { CategoryRepo } from "../../Repository/CategoryRepo.js";
import { DbRepo } from "../../Repository/DbRepo.js";

// Clear localStorage and set up data
// localStorage.clear();
DbRepo.setUpLocalStorage();

let categoriesList = document.getElementById("categoriesList");
// Retrieve categories from localStorage
const categories = CategoryRepo.getAllCategories();
function InitCategories() {
  categoriesList.innerHTML = ""; // Clear old categories
  for (let i = 0; i < categories.length; i++) {
    categoriesList.innerHTML += ` 
                        <li class="nav-item">
                            <a id="all" class="nav-link " href="#" data-category-id="${categories[i].id}">${categories[i].name}</a>
                        </li>`;
  }
}

InitCategories(); // Call function to initialize categories

// Retrieve products from localStorage
const products = JSON.parse(localStorage.getItem("Products")) || [];

// Store categories and products in variables
const allCategories = categories;
const allProducts = products;

// Function to create product cards for a specific category
function generateCategoryProductCards(catId) {
  const categoryProducts = CategoryRepo.getProductsByCatId(catId); // Get products by category ID
  console.log(categoryProducts);
  const container = document.getElementById("productCardsContainer"); // Get the container
  container.innerHTML = ""; // Clear old content

  if (categoryProducts.length === 0) {
    container.innerHTML = "<p>No products available in this category.</p>";
    return;
  }

  // Loop through each product and create a card for each
  categoryProducts.forEach((product) => {
    const maxLength = 20;
    const truncatedName =
      product.name.length > maxLength
        ? product.name.substring(0, maxLength) + "..."
        : product.name;

    const cardHTML = `
            <div class="col">
                <div class="card h-100">
                    <img src="${
                      product.imgPath
                    }" class="card-img-top img-fluid" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title text-truncate" title="${
                          product.name
                        }">${truncatedName}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 mb-0 price">$${product.price.toFixed(
                              2
                            )}</span>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-center">
                        <button class="btn btn-primary btn-sm">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    container.innerHTML += cardHTML; // Add the card to the container
  });
}

// Function to bind events to the category links
function bindCategoryEvents() {
  categories.forEach((category) => {
    const categoryElement = document.querySelector(
      `[data-category-id="${category.id}"]`
    ); // Using data attribute
    console.log(categoryElement, category.id);
    if (categoryElement) {
      categoryElement.addEventListener("click", () => {
        updateCategoryTitle(category.name); // Update category title
        generateCategoryProductCards(category.id); // Display product cards for the category
      });
    }
  });
}

// Function to update the category title
function updateCategoryTitle(categoryName) {
  const categoryTitle = document.getElementById("categoryTitle");
  categoryTitle.textContent = categoryName; // Set the title to the category name
}

// Call the function to bind events when the page loads
document.addEventListener("DOMContentLoaded", bindCategoryEvents);

// دالة للبحث عن منتج
document.getElementById("search-input").addEventListener("input", function () {
  const searchTerm = this.value; // نجيب الكلمة اللي المستخدم كتبها
  const products = ProductRepo.GetAllProducts(); // نجيب كل المنتجات

  // نفلتر المنتجات بناءً على الكلمة المدخلة
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
});
