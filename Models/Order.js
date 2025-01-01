export class Order {
  /*
    "id": 1,
    "userId": 1,
    "orderDate": "2024-12-25T10:30:00Z",
    "status": "Pending",
    "totalAmount": 99.99,
    "products": [
      {
        "productId": 101,
        "name": "Wireless Mouse",
        "quantity": 2,
        "price": 20.0,
        "totalPrice": 40.0
      },
      {
        "productId": 102,
        "name": "Bluetooth Headphones",
        "quantity": 1,
        "price": 59.99,
        "totalPrice": 59.99
      }
    ],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "U.S.A"
    },

    "paymentInfo": {
      "method": "Credit Card",
      "transactionId": "TXN123456789",
      "paymentStatus": "Completed"
    }
    */

  #id;
  #userId;
  #orderDate;
  #status;
  #totalAmount;
  #products;
  #shippingAddress;
  #paymentInfo;

  constructor(data) {
    this.#id = data.id;
    this.#userId = data.userId;
    this.#orderDate = new Date(data.orderDate);
    this.#status = data.status;
    this.#totalAmount = data.totalAmount;
    this.#products = data.products.map((product) => new Product(product));
    this.#shippingAddress = new Address(data.shippingAddress);
    this.#paymentInfo = new PaymentInfo(data.paymentInfo);
  }

  //getters & setters
}
