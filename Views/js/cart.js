import { loggedUser } from "../../Config/Constants.js";
import { DbRepo } from "../../Repository/DbRepo.js";
import { ProductRepo } from "../../Repository/ProductRepo.js";
import { ShoppingCartRepo } from "../../Repository/ShoppingCartRepo.js";
import { Helpers } from "../../Utils/Helpers.js";

console.log(loggedUser);
DbRepo.setUpLocalStorage();

let shoppingCartItemsContainer = document.getElementById(
  "shoppingCartItemsContainer"
);
let shoppingCart = ShoppingCartRepo.getCartByUserId(loggedUser.id);
await renderCartItems(shoppingCart);

async function renderCartItems(cart) {
  shoppingCartItemsContainer.innerHTML = "";
  if (cart.items.length <= 0) {
    shoppingCartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
    updateOrderSummary(cart);

    return;
  }
  let cartItems = cart.items;
  for (let i = 0; i < cartItems.length; i++) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("row", "cart-item", "mb-3");
    let imgSrc = await ProductRepo.getProductImgSrcByProductId(
      cartItems[i].productId
    );
    itemElement.innerHTML = `
            <div class="col-md-3">
              <img
                src="${imgSrc}"
                alt="Product 1"
                class="img-fluid rounded"
                />
            </div>
            <div class="col-md-5">
                <h5 class="card-title">${cartItems[i].name}</h5>
                <p class="text-muted">Category: ${ProductRepo.getCategoryNameByProductId(
                  cartItems[i].productId
                )}</p>
            </div>
            <div class="col-md-2">
                <div class="input-group">
                    <button
                        class="btn btn-outline-secondary btn-sm decrease_quantity"
                        type="button" data-productId="${
                          cartItems[i].productId
                        }">
                        -
                    </button>
                    <input
                        style="max-width: 100px"
                        type="text"
                        class="form-control form-control-sm text-center quantity-input"
                        value="${cartItems[i].quantity}"
                        readonly
                    />
                    <button
                        class="btn btn-outline-secondary btn-sm increase_quantity"
                        type="button" data-productId="${
                          cartItems[i].productId
                        }">
                        +
                    </button>
                </div>
               
            </div>
             <div class="col-md-2 text-end">
                <p class="fw-bold">${cartItems[i].totalPrice.toFixed(2)}</p>
                <button class="btn btn-sm btn-outline-danger delete_item_btn" data-productId="${
                  cartItems[i].productId
                }">
                    <i data-productId="${
                      cartItems[i].productId
                    }" class="bi bi-trash delete_item_btn"></i>
                </button>
            </div>
            <hr />
                `;

    shoppingCartItemsContainer.appendChild(itemElement);
  }

  updateOrderSummary(cart);
}
function updateOrderSummary(cart) {
  let subtotal = document.getElementById("subtotal");
  let total = document.getElementById("total");

  subtotal.innerText = cart.totalPrice.toFixed(2) + " EGP";
  total.innerText = cart.totalPrice.toFixed(2) + " EGP";
}

//register events
shoppingCartItemsContainer.addEventListener("click", async (e) => {
  if (
    e.target.classList.contains("decrease_quantity") &&
    e.target.getAttribute("data-productId")
  ) {
    ShoppingCartRepo.decreaseItemQty(
      shoppingCart,
      +e.target.getAttribute("data-productId")
    );
    shoppingCart = ShoppingCartRepo.getCartById(shoppingCart.cartId);
    await renderCartItems(shoppingCart);
  } else if (
    e.target.classList.contains("increase_quantity") &&
    e.target.getAttribute("data-productId")
  ) {
    ShoppingCartRepo.increaseItemQty(
      shoppingCart,
      +e.target.getAttribute("data-productId")
    );
    shoppingCart = ShoppingCartRepo.getCartById(shoppingCart.cartId);
    await renderCartItems(shoppingCart);
  } else if (
    e.target.classList.contains("delete_item_btn") &&
    e.target.getAttribute("data-productId")
  ) {
    if (confirm("Are you sure you want to remove this item from cart?")) {
      ShoppingCartRepo.removeItem(
        +e.target.getAttribute("data-productId"),
        shoppingCart.cartId
      );
      shoppingCart = ShoppingCartRepo.getCartById(shoppingCart.cartId);
      await renderCartItems(shoppingCart);
    }
  }
});

// empty cart registeration
document.getElementById("emptyCartBtn").addEventListener("click", (e) => {
  if (confirm("Are you sure you want to empty the cart?")) {
    ShoppingCartRepo.emptyCart(shoppingCart);
    shoppingCart = ShoppingCartRepo.getCartByUserId(loggedUser.id);
    renderCartItems(shoppingCart);
    alert("Cart emptied successfully");
  }
});
