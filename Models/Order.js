export class Order {
  /*
    {
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
      "id": 1,
      "method": "Credit Card"
    }
  },
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
    this.#shippingAddress = data.shippingAddress;
    this.#paymentInfo = data.paymentInfo;
  }

  //getters & setters
  get Id() {
    return this.#id;
  }

  set Id(value) {
    this.#id = value;
  }

  get UserId() {
    return this.#userId;
  }
  set UserId(value) {
    this.#userId = value;
  }

  get OrderDate() {
    return this.#orderDate;
  }
  set OrderDate(value) {
    this.#orderDate = value;
  }

  get Status() {
    return this.#status;
  }
  set Status(value) {
    this.#status = value;
  }

  get TotalAmount() {
    return this.#totalAmount;
  }
  set TotalAmount(value) {
    this.#totalAmount = value;
  }

  get Products() {
    return this.#products;
  }
  set Products(value) {
    this.#products = value;
  }

  get ShippingAddress() {
    return this.#shippingAddress;
  }
  set ShippingAddress(value) {
    this.#shippingAddress = value;
  }

  get PaymentInfo() {
    return this.#paymentInfo;
  }
  set PaymentInfo(value) {
    this.#paymentInfo = value;
  }

  toJSON() {
    return {
      id: this.#id,
      userId: this.#userId,
      orderDate: this.#orderDate.toISOString(),
      status: this.#status,
      totalAmount: this.#totalAmount,
      products: this.#products.map((product) => product.toJSON()),
      shippingAddress: this.#shippingAddress,
      paymentInfo: this.#paymentInfo,
    };
  }
}
