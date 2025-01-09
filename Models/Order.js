// Class representing an order

import { OrderRepo } from "../Repository/OrderRepo.js";
import { Helpers } from "../Utils/Helpers.js";
import { ShoppingCart } from "./ShoppingCart.js";
import { PaymentMethod } from "./PaymentMethod.js";

export class Order {
  /*
    Example data for an order:
    {
      "id": 1,
      "userId": 1,
      "orderDate": "2024-12-25T10:30:00Z",
      "status": "Pending",
      "totalAmount": 99.99,
      "cartItems": [
        { "productId": 101, "name": "Wireless Mouse", "quantity": 2, "price": 20.0, "totalPrice": 40.0 },
        { "productId": 102, "name": "Bluetooth Headphones", "quantity": 1, "price": 59.99, "totalPrice": 59.99 }
      ],
      "shippingAddress": { "street": "123 Main St", "city": "New York", "state": "NY", "zipCode": "10001", "country": "U.S.A" },
      "paymentInfo": { "method": "Credit Card", "transactionId": "TXN123456789", "paymentStatus": "Completed" }
    }
  */

  // Private attributes for the order's details
  #id;
  #userId;
  #orderDate;
  #status;
  #totalAmount;
  #totalPrice;
  #cartItems;
  #shippingAddress;
  #paymentMethod;
  #subOrders = [];

  static #autoIncrement =
    OrderRepo.getOrdersInLcStLen() === 0
      ? 1
      : OrderRepo.getOrdersInLcStLen() + 1;

  // Constructor to initialize an order with the provided data
  constructor(
    _userId,
    _orderDate,
    _status,
    _cartItems,
    _shippingAddress,
    _paymentMethod
  ) {
    this.#id = Order.#autoIncrement++;
    this.#userId = _userId;
    this.#orderDate = _orderDate;
    this.#status = _status; // Order status (e.g., Pending)

    this.#cartItems = _cartItems;
    this.#totalPrice = _cartItems.reduce(
      (sum, next) => sum + next.TotalPrice,
      0
    );

    this.#totalAmount = _cartItems.length;

    // Create an Address instance for shipping address
    this.#shippingAddress = _shippingAddress;
    this.#paymentMethod = _paymentMethod;
  }

  // Add getters and setters if needed (not shown in this snippet)
  get Id() {
    return this.#id;
  }

  set Id(value) {
    // Cannot modify the order ID once set
    throw new Error("Order ID cannot be modified.");
  }

  get UserId() {
    return this.#userId;
  }

  set UserId(value) {
    // Cannot modify the user ID once set
    throw new Error("User ID cannot be modified.");
  }

  get OrderDate() {
    return this.#orderDate;
  }

  set OrderDate(value) {
    // Cannot modify the order date once set
    throw new Error("Order date cannot be modified.");
  }

  get TotalAmount() {
    return this.#totalAmount;
  }

  set TotalAmount(value) {
    if (Helpers.isNumber(value) && Helpers.isPositive(value)) {
      this.#totalAmount = value;
    } else {
      throw new Error("Total amount must be a positive number.");
    }
  }

  get TotalPrice() {
    return this.#totalPrice;
  }

  set TotalPrice(value) {
    if (Helpers.isNumber(value) && Helpers.isPositive(value)) {
      this.#totalPrice = value;
    } else {
      throw new Error("Total price must be a positive number.");
    }
  }

  get Status() {
    return this.#status;
  }

  set Status(value) {
    if (["Pending", "Completed", "Cancelled"].includes(value)) {
      this.#status = value;
    } else {
      throw new Error(
        "Order status must be one of: Pending, Completed, or Cancelled."
      );
    }
  }

  get CartItems() {
    return this.#cartItems;
  }

  set CartItems(value) {
    if (
      Array.isArray(value) &&
      value.every((item) => item instanceof ShoppingCart)
    ) {
      this.#cartItems = value;
    } else {
      throw new Error("Cart items must be an array of CartItem instances.");
    }
  }

  get ShippingAddress() {
    return this.#shippingAddress;
  }

  set ShippingAddress(value) {
    if (value instanceof Address) {
      this.#shippingAddress = value;
    } else {
      throw new Error("Shipping address must be an Address instance.");
    }
  }

  get PaymentMethod() {
    return this.#paymentMethod;
  }

  set PaymentMethod(value) {
    if (value instanceof PaymentMethod) {
      this.#paymentMethod = value;
    } else {
      throw new Error("Payment method must be a string.");
    }
  }

  // methods
  toJSON() {
    return {
      id: this.#id,
      userId: this.#userId,
      orderDate: this.#orderDate,
      status: this.#status,
      totalAmount: this.#totalAmount,
      totalPrice: this.#totalPrice,
      cartItems: this.#cartItems.map((item) => item.toJSON()),
      shippingAddress: this.#shippingAddress.toJSON(),
      paymentInfo: this.#paymentMethod,
    };
  }
}
