import { ProductRepo } from "../Repository/ProductRepo.js";
export class ProductsController {
  getAllProducts() {
    return ProductRepo.GetAllProducts() || [];
  }
}
