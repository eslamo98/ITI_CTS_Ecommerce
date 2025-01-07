import { Helpers } from "../Utils/Helpers.js";
import { ProductRepo } from "./ProductRepo.js";
import { UsersRepo } from "./UsersRepo.js";

export class OrderRepo {
  // Retrieves all orders from localStorage and returns them as a string.
  // If no orders exist, it returns an empty array.
  static getAllOrders() {
    return JSON.parse(localStorage.getItem("Orders")) || [];
  }

  // Saves the given orders array to localStorage under the "Orders" key.
  static saveOrders(orders) {
    localStorage.setItem("Orders", JSON.stringify(orders));
  }

  // Adds a new order to the list of existing orders.
  // It retrieves all current orders, adds the new one, and then saves the updated list.
  static addOrder(order) {
    const currentOrders = OrderRepo.getAllOrders(); // Get current orders from localStorage
    currentOrders.push(order); // Add the new order to the list
    OrderRepo.saveOrders(currentOrders); // Save the updated list back to localStorage
  }

  // Removes an order from the list based on the given order ID.
  // It filters out the order with the matching ID and saves the updated list.
  static removeOrder(orderId) {
    const currentOrders = OrderRepo.getAllOrders(); // Get current orders from localStorage
    const updatedOrders = currentOrders.filter((order) => order.id !== orderId); // Filter out the order by ID
    OrderRepo.saveOrders(updatedOrders); // Save the updated list back to localStorage
  }

  static getOrdersInLcStLen() {
    return this.getAllOrders().length;
  }

  static getAllSellerOrders(sellerId) {
    const currentOrders = OrderRepo.getAllOrders();

    // Get current orders from localStorage
    let sellerOrders = currentOrders.map((order) => {
      for (let i = 0; i < order.cartItems.length; i++) {
        order.cartItems = order.cartItems.filter(
          (item) =>
            ProductRepo.getSellerIdByProductId(item.productId) == sellerId
        );

        order.totalPrice = order.cartItems.reduce(
          (sum, next) => sum + next.totalPrice,
          0
        );

        order.totalAmount = order.cartItems.length;
      }
    });
    // Helpers.myConsole(currentOrders, "currentOrders from orderRepo");

    return currentOrders; // Return the filtered orders array
  }

  static getSellerOrderById(orderId, sellerId) {
    return this.getAllSellerOrders(sellerId).find(
      (order) => order.id == orderId
    );
  }

  static filterOrdersByCustomerName(username, sellerId) {
    const currentOrders = OrderRepo.getAllOrders();
    const sellerOrders = currentOrders.filter(
      (order) =>
        order.userId === sellerId &&
        UsersRepo.getRoleByUserId(order.userId).includes(username)
    ); // Filter out orders by seller ID and customer name
  }
}
