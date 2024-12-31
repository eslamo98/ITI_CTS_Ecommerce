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

  static saveProducts(products) {
    return JSON.parse(
      localStorage.setItem("Products", JSON.stringify(products))
    );
  }

  static getProductImgPathById(productId) {
    let allProducts = this.GetAllProducts();
    if (allProducts) {
      let product = allProducts.find((product) => product.id === productId);

      if (product && product.imgPath) {
        return product.imgPath;
      }
    }
  }
}
