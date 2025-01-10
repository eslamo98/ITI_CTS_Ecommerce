import { Product } from "../../Models/Product.js";
import { DbRepo } from "../../Repository/DbRepo.js";
import { ProductRepo } from "../../Repository/ProductRepo.js";
import { ShoppingCartRepo } from "../../Repository/ShoppingCartRepo.js";

// Set up local storage
DbRepo.setUpLocalStorage();

// Function to display product details or a message if no product is found
function renderProduct(productId) {
    const itemsContainer = document.getElementById('container');
    itemsContainer.innerHTML = ""; // Clear the container

    // Fetch the product by ID
    const product = ProductRepo.GetProductById(productId);

    if (product) {
        // If the product exists, render its details
        const productsContainer = document.createElement('div');
        productsContainer.classList.add("row");
        productsContainer.innerHTML = `
            <div class="col-md-6 mb-4 d-flex justify-content-center align-items-center product-img">
                <img src=${product.imgPath} alt=${product.name} class="img-fluid rounded mb-3 product-image" id="mainImage">
            </div>
            <div class="col-md-6">
                <h2 class="mb-3">${product.name}</h2>
                <p class="text-muted mb-4">SKU: WH1000XM4</p>
                <div class="mb-3">
                    <span class="h4 me-2">${product.price}</span>
                </div>
                <div class="mb-3">
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-half text-warning"></i>
                    <span class="ms-2">4.5 (120 reviews)</span>
                </div>
                <p class="mb-4">${product.description}</p>
                <div class="mb-4">
                    <!-- Quantity Input -->
                    <div class="input-group mb-3" style="max-width: 200px;">
                        <button class="btn btn-outline-dark btn-sm" type="button" onclick="decreaseQuantity()">-</button>
                        <input type="text" class="form-control form-control-sm text-center quantity-input" value="1" aria-label="Quantity">
                        <button class="btn btn-outline-dark btn-sm" type="button" onclick="increaseQuantity()">+</button>
                    </div>
                
                    <!-- Add to Cart Button -->
                    <button class="btn btn-danger btn-lg mb-3 me-2" onclick="addToCart(${product.id})">
                        <i class="bi bi-cart-plus"></i> Add to Cart
                    </button>
                </div>
                <div class="mt-4" id="Delivery">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-truck icon"></i>
                        <div>
                            <h5> Free Delivery</h5>
                            <p class="small">Enter your promo code for Delivery Availability</p>
                        </div>    
                    </div>
                    <hr>
                    <div class="d-flex align-items-center">
                        <i class="bi bi-arrow-left-right icon"></i>
                        <div>
                            <h5>Return Delivery</h5>
                            <p class="small">Free 30 Days Delivery Returns.</p>
                        </div>
                    </div>
                </div>
            </div>`;
        itemsContainer.appendChild(productsContainer);
    } else {
        // If no product is found, display a message
        itemsContainer.innerHTML = `
            <div class="text-center">
                <h3>No product found.</h3>
                <p>Continue shopping <a href="catalog.html">here</a>.</p>
            </div>`;
    }
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = ProductRepo.GetProductById(productId);
    if (product) {
        ShoppingCartRepo.AddToCart(product);
        alert(`${product.name} has been added to your cart.`);
    } else {
        alert("Product not found.");
    }
}

// Function to decrease quantity
function decreaseQuantity() {
    const input = document.querySelector('.quantity-input');
    let value = parseInt(input.value) || 1;
    if (value > 1) {
        input.value = value - 1;
    }
}

// Function to increase quantity
function increaseQuantity() {
    const input = document.querySelector('.quantity-input');
    let value = parseInt(input.value) || 1;
    input.value = value + 1;
}

// On page load, fetch the product ID from the URL and render the product
document.addEventListener("DOMContentLoaded", () => {
    // Extract product ID from the URL (e.g., ?id=123)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        // Render the product if the ID is valid
        renderProduct(parseInt(productId));
    } else {
        // If no product ID is found, display a message
        const itemsContainer = document.getElementById('container');
        itemsContainer.innerHTML = `
            <div class="text-center">
                <h3>No product selected.</h3>
                <p>Continue shopping <a href="catalog.html">here</a>.</p>
            </div>`;
    }
});



