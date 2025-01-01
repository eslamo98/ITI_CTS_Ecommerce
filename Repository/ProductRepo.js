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
    localStorage.setItem("Products", JSON.stringify(products));
  }

  static getProductImgPathById(productId) {
    let allProducts = this.GetAllProducts();
    console.log(allProducts);
    if (allProducts) {
      let product = allProducts.find((product) => product.ID === productId);
      console.log(productId);
      if (product && product.ImgPath) {
        return product.ImgPath;
      }
    }
  }
}
