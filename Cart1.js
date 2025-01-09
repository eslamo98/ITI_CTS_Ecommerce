import { ShoppingCartRepo } from "./Repository/ShoppingCartRepo.js";
import { ProductRepo } from "./Repository/ProductRepo.js";
import { UsersRepo } from "./Repository/UsersRepo.js";
import { DbRepo } from "./Repository/DbRepo.js";
import { loggedUser } from "./Config/Constants.js";
import { Helpers } from "./Utils/Helpers.js";

localStorage.clear();
DbRepo.setUpLocalStorage();
// check if user logged
if (loggedUser) {
  const cart = ShoppingCartRepo.getCartByUserId(loggedUser.id);
  Helpers.myConsole(cart, "cart");
  renderCartItem(cart);
  UpdateCartSummary(cart);
} else {
  alert("You must Login first");
  window.location.href = "./index.html";
}
// to add to cart
function renderCartItem(cart) {
  if (!cart) {
    alert("No cart found for this user");
  }
  const cartItemsContainer = document.querySelector(".card-body");
  cartItemsContainer.innerHTML = "";
  //   if (cart) {

  cart.items.forEach(async (item) => {
    let imgSrc = await ProductRepo.getProductImgSrcByProductId(item.productId);
    Helpers.myConsole(item, "item");
    const product = ProductRepo.GetProductById(item.productId);
    Helpers.myConsole(product, "jhggj");
    // if (product) {
    const productElement = document.createElement("div");
    productElement.classList.add("row", "cart-item", "mb-3");

    productElement.innerHTML = `<div class="col-md-3">
                                <img src="${imgSrc}" alt="${
      product.name
    }" class="img-fluid rounded">
            </div>
            <div class="col-md-5">
                <h5 class="card-title">${product.name}</h5>
                <p class="text-muted">Category: ${product.category}</p>
                </div> 
                <div class="col-md-2">
                <div class="input-group">
                <button class="btn btn-outline-secondary btn-sm minusQuantity" type="button">-</button>
                    <input style="max-width:100px" type="text" class="form-control  form-control-sm text-center quantity-input" value="1">
                    <button class="btn btn-outline-secondary btn-sm addQuantity" type="button">+</button>
                </div>
            </div>
            <div class="col-md-2 text-end">
                <p class="fw-bold">${(product.price * item.quantity).toFixed(
                  2
                )}</p>
                <button class="btn btn-sm btn-outline-danger remove-item">
                        <i class="bi bi-trash"></i>
                        </button>
                        </div>
                        </div>`;

    Helpers.myConsole(productElement, "JJJJJJJJJJJ");
    // to add or minus the quantity
    productElement
      .querySelector(".minusQuantity")
      .addEventListener("click", function () {
        if (item.quantity > 1) {
          item.quantity -= 1;
          ShoppingCartRepo.saveShopingCarts(ShoppingCartRepo.getAllCarts());
          renderCartItem(ShoppingCartRepo.getCartByUserId(loggedUser.id));
          UpdateCartSummary(ShoppingCartRepo.getCartByUserId(loggedUser.id));
        }
      });
    productElement
      .querySelector(".addQuantity")
      .addEventListener("click", function () {
        item.quantity += 1;
        ShoppingCartRepo.saveShopingCarts(ShoppingCartRepo.getAllCarts());
        renderCartItem(ShoppingCartRepo.getCartByUserId(loggedUser.id));
        UpdateCartSummary(ShoppingCartRepo.getCartByUserId(loggedUser.id));
      });
    // to remove item
    productElement
      .querySelector(".remove-item")
      .addEventListener("click", function () {
        const confirmed = window.confirm(
          `Are you sure you want to delete${product.name} from your cart? `
        );
        if (confirmed) {
          ShoppingCartRepo.removeItem(item.productId, cart.cartId);
          renderCartItem(cart);
          UpdateCartSummary(cart);
        }
      });
    cartItemsContainer.appendChild(productElement);

    // Apply promo code
    const applyButton = document.getElementById("ApplyButton");
    const promoCode = document.getElementById("promoCodeInput");
    const promoMessage = document.getElementById("promoCodeMsg");
    applyButton.addEventListener("click", function () {
      var promo = promoCode.value;
      var validpromocodes = ["Discount25", "Sale20"];
      if (validpromocodes.includes(promo)) {
        promoMessage.innerHTML =
          '<div class="alert alert-success">Promo code applied successfully</div>';
      } else {
        promoMessage.innerHTML =
          '<div class="alert alert-danger"> Invalid Promo code , Please try again </div>';
      }
    });
    // }
  });
  //   }
}
// Updating cart items
function UpdateCartSummary(cart) {
  if (!cart) {
    alert("No cart found for this user");
  }
  const subtotal = cart.items.reduce((total, item) => {
    const product = ProductRepo.GetProductById(item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
  const shipping = 80;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;
  document.querySelector(
    ".cart-summary .d-flex:nth-of-type(1) span:last-child"
  ).textContent = `${subtotal.toFixed(2)} EGP`;
  document.querySelector(
    ".cart-summary .d-flex:nth-child(2) span:last-child"
  ).textContent = `${shipping.toFixed(2)} EGP`;
  document.querySelector(
    ".cart-summary .d-flex:nth-child(3) span:last-child"
  ).textContent = `${tax.toFixed(2)} EGP`;
  document.querySelector(
    ".cart-summary .d-flex:nth-of-type(4) strong:last-child"
  ).textContent = `${total.toFixed(2)} EGP`;
}
