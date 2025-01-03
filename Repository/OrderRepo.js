export class OrderRepo {
  // Retrieves all orders from localStorage and returns them as a string.
  // If no orders exist, it returns an empty array.
  static getAllOrders() {
    return JSON.stringify(localStorage.getItem("Orders")) || [];
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
}
