export class ProductRepo {
  static GetProductById(productId) {
    let products = this.GetAllProducts();
    if (products) {
      return products.find((product) => product.id === productId);
    } else {
      return null;
    }
  }

  static GetAllProducts() {
    return JSON.parse(localStorage.getItem("Products"));
  }
}
