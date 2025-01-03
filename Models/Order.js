// Class representing an order 

export class Order {
  /*
    Example data for an order:
    {
      "id": 1,
      "userId": 1,
      "orderDate": "2024-12-25T10:30:00Z",
      "status": "Pending",
      "totalAmount": 99.99,
      "products": [
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
  #products;
  #shippingAddress;
  #paymentInfo;

  // Constructor to initialize an order with the provided data
  constructor(data) {
    this.#id = data.id;  // Order ID
    this.#userId = data.userId;  // User ID who placed the order
    this.#orderDate = new Date(data.orderDate);  // Convert order date to a Date object
    this.#status = data.status;  // Order status (e.g., Pending)
    this.#totalAmount = data.totalAmount;  // Total amount of the order

    // Map product data to instances of the Product class
    this.#products = data.products.map((product) => new Product(product));

    // Create an Address instance for shipping address
    this.#shippingAddress = new Address(data.shippingAddress);

    // Create a PaymentInfo instance for payment details
    this.#paymentInfo = new PaymentInfo(data.paymentInfo);
  }

  // Add getters and setters if needed (not shown in this snippet)
}
