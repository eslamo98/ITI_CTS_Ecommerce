// This class manages the category data stored in localStorage.
export class CategoryRepo {
  // Retrieves all categories from localStorage. Returns an empty array if no categories are found.
  static getAllCategories() {
    return JSON.parse(localStorage.getItem("Categories")) || [];
  }

  // Deletes a category by its ID from localStorage.
  static deleteCategory(catId) {
    const categories = CategoryRepo.getAllCategories(); // Get the current list of categories
    const updatedCategories = categories.filter(
      (category) => category.id !== catId // Remove the category with the matching ID
    );
    CategoryRepo.saveCategories(updatedCategories); // Save the updated list of categories
  }

  // Saves an array of categories to localStorage.
  static saveCategories(categories) {
    localStorage.setItem("Categories", JSON.stringify(categories));
  }

  // Adds a new category to the list of categories stored in localStorage.
  static addCategory(category) {
    const existingCategories = CategoryRepo.getAllCategories(); // Get the existing categories
    existingCategories.push(category); // Add the new category to the list
    CategoryRepo.saveCategories(existingCategories); // Save the updated list of categories
  }

  // Retrieves a category by its ID.
  static getCategoryById(catId) {
    const categories = CategoryRepo.getAllCategories(); // Get the current list of categories
    return categories.find((category) => category.id === catId); // Find and return the category by its ID
  }

  // Retrieves a category by its name.
  static getCategoryByName(catName) {
    const categories = CategoryRepo.getAllCategories(); // Get the current list of categories
    return categories.find((category) => category.name === catName); // Find and return the category by its name
  }

  // Updates an existing category by its ID with new data.
  static updateCategory(catId, updatedCategory) {
    const categories = CategoryRepo.getAllCategories(); // Get the current list of categories
    const index = categories.findIndex((category) => category.Id === catId); // Find the category by its ID
    if (index != -1) {
      categories[index] = updatedCategory; // Update the category if found
      CategoryRepo.saveCategories(categories); // Save the updated list of categories
      return true; // Return true indicating the update was successful
    }
    return false; // Return false if the category was not found
  }

    // Retrieves a product by catagory id.

  // static getProductsByCatId(catId) {
  //   return ProductRepo.GetAllProducts().filter(product => product.categoryId === catId)
  // }

//  static getProductsByCatId(catId) {
//     return this.products.filter(product => product.categoryId === catId);
// }

static getProductsByCatId(catId) {
  const products = JSON.parse(localStorage.getItem("Products")) || [];
  return products.filter(product => product.categoryId === catId);
}


  // Additional functionality can be added here in the future (e.g., searching categories).
}
