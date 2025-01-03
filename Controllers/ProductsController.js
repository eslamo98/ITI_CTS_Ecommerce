import { ProductRepo } from "../Repository/ProductRepo.js";


export class ProductsController {
  
  // Method to get all products
  getAllProducts() {
    return ProductRepo.GetAllProducts() || [];
  }
}












/*  ----------------------------File Summary-------------------------------

getAllProducts():
  -This method calls ProductRepo.GetAllProducts() to fetch the list of all products.
  -If no products are found, it returns an empty array ([]) as a fallback.

-The ProductRepo class is responsible for the logic of retrieving product data,
so the controller simply acts as a middleman to make the request easier and more abstracted
for other parts of the application.

*/


