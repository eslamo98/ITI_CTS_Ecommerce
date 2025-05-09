import { ImgsTables } from "../Config/ImgsTables.js";
import { Helpers } from "../Utils/Helpers.js";
import { CategoryRepo } from "./CategoryRepo.js";
import { IndexedDBRepo } from "./IndexedDBRepo.js";
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
    products.unshift(product);
    ProductRepo.saveProducts(products);
  }

  //update product by id return bool value
  static updateProduct(productId, updatedProduct) {
    let products = ProductRepo.GetAllProducts();
    let index = products.findIndex((product) => product.id === productId);
    if (index > -1) {
      products[index] = updatedProduct;
      console.log(products);
      ProductRepo.saveProducts(products);
      return true;
    }

    return false;
  }

  static getCategoryNameByProductId(productId) {
    let product = ProductRepo.GetProductById(productId);
    let categories = CategoryRepo.getAllCategories();
    let category = categories.find((cat) => cat.id === product.categoryID);
    return category ? category.name : null;
  }

  //this method delete product by id return bool value
  static deleteProduct(productId) {
    let products = ProductRepo.GetAllProducts();
    let newProducts = products.filter((product) => product.id !== productId);
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

    if (allProducts) {
      let product = allProducts.find((product) => product.ID === productId);
      console.log(productId);
      if (product && product.ImgPath) {
        return product.ImgPath;
      }
    }
  }

  static getNumberOfProductsInLOSt() {
    return this.GetAllProducts().length;
  }

  static getSellerIdByProductId(productId) {
    let product = ProductRepo.GetProductById(productId);
    if (product) {
      // Helpers.myConsole(product.sellerId, "From get seller id");

      return product.sellerId;
    }
  }

  static async getProductImgSrcByProductId(productId) {
    let product = ProductRepo.GetProductById(productId);
    if (product.imgPath) {
      return product.imgPath; // Use imgPath if available
    } else {
      // Fetch the image from IndexedDB
      const productImg = await IndexedDBRepo.getById(
        ImgsTables.productImg,
        product.id
      );

      return productImg?.imgBinary || "Images/default.png"; // Fallback to a default image
    }
  }

  static updateProductQuantity(productId, qty) {
    let products = ProductRepo.GetAllProducts();
    let product = products.find((product) => product.id === productId);
    if (product) {
      product.quantity += +qty;
      ProductRepo.saveProducts(products);
      return true;
    }
    return false;
  }
}
