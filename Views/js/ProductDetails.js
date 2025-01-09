
import { Product } from "../../Models/Product.js";
import { DbRepo } from "../../Repository/DbRepo.js";
import { ProductRepo } from "../../Repository/ProductRepo.js";
import { ShoppingCartRepo } from "../../Repository/ShoppingCartRepo.js";




DbRepo.setUpLocalStorage();

//to display data 
function renderProducts(products){
    const itemsContainer = document.getElementById('container');
    itemsContainer.innerHTML = "";

     products.forEach( (item) => {
        const product = ProductRepo.GetProductById(item.productId);
        const productsContainer = document.createElement('div');
        productsContainer.classList.add("row");
        productsContainer.innerHTML=`<div class="col-md-6 mb-4 d-flex justify-content-center align-items-center product-img">
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
                
                    <!-- Buttons -->
                    <button class="btn btn-danger btn-lg mb-3 me-2">
                        <i class="bi bi-cart-plus"></i> Add to Cart
                    </button>
                </div>
                <div class="mt-4" id="Delivery">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-truck icon"></i>
                        <div>
                    <h5> Free Delivery</h5>
                    <p class="small">Enter your promo code for Delivery Availabity</p>
                        </div>    
                </div>
                    <hr>
                    <div class="d-flex align-items-center">
                        <i class="bi bi-arrow-left-right icon"></i>
                        <div>
                    <h5>Return Delivery</h5>
                    <p class="small">Free 30 Days Delivery Returns. </p>
                        </div>
                    </div>
                </div>
                </div>`;
                itemsContainer.appendChild(productsContainer);
        
     });
     
}
//Add to cart button
const AddtoCart = document.querySelector('.btn-danger');
AddtoCart.addEventListener("click",function(){

})










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

// Function to validate quantity input
function validateQuantity(input) {
    let value = parseInt(input.value) || 1;
    if (value < 1) {
        input.value = 1;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const products = ProductRepo.GetAllProducts(); // Fetch all products
    renderProducts(products);
});