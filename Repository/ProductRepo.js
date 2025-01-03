import { UsersRepo } from "./UsersRepo.js";

export class ProductRepo {
  //this method save products to local storage
  static GetProductById(productId) {
    let products = ProductRepo.GetAllProducts();
    if (products) {
      return products.find((product) => product.id === productId);
    } else {
      return null;
    }
  }

  //this method return all products from local storage
  static GetAllProducts() {
    return JSON.parse(localStorage.getItem("Products")) || [];
  }

  //this method add a product
  static addProduct(product) {
    let products = ProductRepo.GetAllProducts();
    products.push(product);
    ProductRepo.saveProducts(products);
  }

  //update product by id return bool value
  static updateProduct(productId, updatedProduct) {
    let products = ProductRepo.GetAllProducts();
    let index = products.findIndex((product) => product.id === productId);
    if (index > -1) {
      products[index] = updatedProduct;
      ProductRepo.saveProducts(products);
      return true;
    }

    return false;
  }

  //this method delete product by id return bool value
  static deleteProduct(productId) {
    let products = ProductRepo.GetAllProducts();
    let newProducts = products.fillter((product) => product.id !== productId);
    ProductRepo.saveProducts(newProducts);
  }

  //this method save products to local storage
  static saveProducts(products) {
    localStorage.setItem("Products", JSON.stringify(products));
  }

  //this method filter products with product name
  static filterProductsByName(productName, sellerId) {
    let products = UsersRepo.getAllSellerProducts(sellerId);
    return products.filter((product) =>
      product.name.toLowerCase().includes(productName.toLowerCase())
    );
  }

  //This method return product img path if it exist and null if not
  static getProductImgPathById(productId) {
    let allProducts = ProductRepo.GetAllProducts();
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
