import { loggedUser } from "../../Config/Constants.js";
import { OrderStatus } from "../../Config/OrderStatus.js";
import { Order } from "../../Models/Order.js";
import { Address } from "../../Models/Address.js";
import { ShoppingCartRepo } from "../../Repository/ShoppingCartRepo.js";
import { OrderRepo } from "../../Repository/OrderRepo.js";
import { ShoppingCartItem } from "../../Models/ShoppingCartItem.js";
import { Helpers } from "../../Utils/Helpers.js";
import { ProductRepo } from "../../Repository/ProductRepo.js";

let allCheckoutParts = document.querySelectorAll(".part");
let activeStep = document.querySelector(".step .bg-success");
let stepsBar = document.querySelector(".Steps-bar");
document.querySelector("form").addEventListener("click", (e) => {
  if (e.target.classList.contains("traverse-btn")) {
    let moveTo = +e.target.dataset.moveTo;
    allCheckoutParts.forEach((part, index) => {
      if (part.classList.contains(`part${moveTo}`)) {
        part.classList.remove("d-md-none");
      } else {
        part.classList.add("d-md-none");
      }
    });

    document.getElementById(`step${moveTo}`).click();
  }
});
stepsBar.addEventListener("click", (e) => {
  if (e.target.classList.contains("stepNumber")) {
    let clickedStep = +e.target.innerText;
    allCheckoutParts.forEach((part, index) => {
      if (part.classList.contains(`part${clickedStep}`)) {
        part.classList.remove("d-md-none");
      } else {
        part.classList.add("d-md-none");
      }
    });
  }
});
let totalRow = document.getElementById("totalRow");
let subTotalRow = document.getElementById("subTotalRow");
let checkoutProducts = document.getElementById("checkoutProducts");

let shoppingCart = ShoppingCartRepo.getCartByUserId(loggedUser.id);
let cartItems = shoppingCart.items;

let productsContainer = document.createElement("div");
productsContainer.classList.add(
  "checkout-product",
  "d-flex",
  "align-items-center",
  "mb-3",
  "flex-column"
);
for (let i = 0; i < cartItems.length; i++) {
  let imgSrc = await ProductRepo.getProductImgSrcByProductId(
    cartItems[i].productId
  );
  productsContainer.innerHTML += `
            <div class="checkout-product d-flex align-items-center mb-3 justify-content-between w-100">
              <div class="d-flex align-items-center" style="gap: 15px">
                <img src="${imgSrc}" alt="${
    cartItems[i].name
  }" class="img-thumbnail" style="width: 100px;" />
                <h5>${cartItems[i].name}</h5>
              </div>
              <div class="ms-3 d-flex" style="gap: 10px">
                <p>x${cartItems[i].quantity}</p>
                <p> $${cartItems[i].price.toFixed(2)}</p>
              </div>
            </div>
          `;
}

subTotalRow.children[1].innerText = `$${shoppingCart.totalPrice}`;
totalRow.children[1].innerText = `$${shoppingCart.totalPrice}`;
checkoutProducts.insertAdjacentElement("afterbegin", productsContainer);
function CheckValidationStep1() {
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let part1Next = document.getElementById("part1Next");

  function checkNameInput(value) {
    if (Helpers.isNotNullOrEmpty(value)) {
      return {
        result: false,
        message: "Name is required it can't be empty string.",
      };
    } else if (Helpers.isOnlyText(value)) {
      return { result: false, message: "Name can't contain numbers" };
    } else if (!Helpers.stringLengthGOrEqual(value, 3)) {
      return {
        result: false,
        message: "Name should be at least 3 characters long.",
      };
    } else {
      return { result: true, message: "Name is valid" };
    }
  }

  function checkPhoneInput(value) {
    if (Helpers.isPhoneNumber(value)) {
      return { result: true, message: "Phone number is valid" };
    } else {
      return { result: false, message: "Phone number is not valid" };
    }
  }

  function checkEmailInput(value) {
    if (Helpers.isEmail(value)) {
      return { result: true, message: "Email is valid" };
    } else {
      return { result: false, message: "Email is not valid" };
    }
  }

  let firstNameResult = checkNameInput(firstName.value);
  let lastNameResult = checkNameInput(lastName.value);
  let emailResult = checkEmailInput(email.value);
  let phoneResult = checkPhoneInput(phone.value);
}

function CheckValidationStep2() {}
function CheckValidationStep3() {
  let paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );
  let part3Next = document.getElementById("part3Next");
}

let checkoutForm = document.getElementById("checkoutForm");
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Billing Details
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();

  // Shipping Details
  let sameAddress = document.getElementById("sameAddress").checked;
  let country = document.getElementById("country").value.trim();
  let state = document.getElementById("state").value.trim();
  let city = document.getElementById("city").value.trim();
  let street = document.getElementById("street").value.trim();
  let zipcode = document.getElementById("zipcode").value.trim();

  // Payment Info
  let selectedPaymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );
  if (!selectedPaymentMethod) {
    alert("Please select a payment method.");
    return;
  }
  let paymentMethod = selectedPaymentMethod.value;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !country ||
    !state ||
    !city ||
    !street ||
    !zipcode
  ) {
    alert("Please fill out all required fields.");
    return;
  }

  // Create Address object
  let shippingAddress = new Address(street, city, state, zipcode, country);

  // Get user ID and other order details
  let userId = loggedUser.id;
  let orderDate = Helpers.formatDate(new Date()); // Current date and time
  let orderStatus = OrderStatus.PENDING;

  // Retrieve cart items and total price from shopping cart
  let cartItems = shoppingCart.items; // Assuming your shopping cart has a getItems method
  let items = [];
  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add items to proceed.");
    return;
  } else {
    for (let i = 0; i < cartItems.length; i++) {
      let product = ProductRepo.GetProductById(cartItems[i].productId);
      if (cartItems[i].quantity > product.quantity) {
        alert(
          `Insufficient stock for ${product.name}. Only ${product.quantity} available.`
        );
        return;
      } else {
        product.quantity -= cartItems[i].quantity;
        ProductRepo.updateProduct(product.id, product);
        items.push(
          new ShoppingCartItem(
            cartItems[i].productId,
            cartItems[i].name,
            cartItems[i].quantity,
            cartItems[i].price
          )
        );
      }
    }
  }
  cartItems = items;
  // Create the Order object
  let newOrder = new Order(
    userId,
    orderDate,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod
  );

  // Save the order to local storage (or use OrderRepo)
  OrderRepo.addOrder(newOrder.toJSON());

  // Success message
  alert("Order placed successfully!");

  // Redirect or clear the form
  checkoutForm.reset();
});
