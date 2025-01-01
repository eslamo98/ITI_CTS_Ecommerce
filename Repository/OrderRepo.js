export class OrderRepo {
  static getAllOrders() {
    return JSON.stringify(localStorage.getItem("Orders")) || [];
  }

  static saveOrders(orders) {
    localStorage.setItem("Orders", JSON.stringify(orders));
  }

  static addOrder(order) {
    const currentOrders = OrderRepo.getAllOrders();
    currentOrders.push(order);
    OrderRepo.saveOrders(currentOrders);
  }

  static removeOrder(orderId) {
    const currentOrders = OrderRepo.getAllOrders();
    const updatedOrders = currentOrders.filter((order) => order.id !== orderId);
    OrderRepo.saveOrders(updatedOrders);
  }
}
