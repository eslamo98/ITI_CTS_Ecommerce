export class CategoryRepo {
  static getAllCategories() {
    return localStorage.getItem("Categories") || [];
  }

  //this funcytion will delete category by category id
  static deleteCategory(catId) {
    const categories = CategoryRepo.getAllCategories();
    const updatedCategories = categories.filter(
      (category) => category.id !== catId
    );
    CategoryRepo.saveCategories(updatedCategories);
  }

  static saveCategories(categories) {
    localStorage.setItem("Categories", JSON.stringify(categories));
  }

  static addCategory(category) {
    const existingCategories = CategoryRepo.getAllCategories();
    existingCategories.push(category);
    CategoryRepo.saveCategories(existingCategories);
  }

  static getCategoryById(catId) {
    const categories = CategoryRepo.getAllCategories();
    return categories.find((category) => category.id === catId);
  }

  static getCategoryByName(catName) {
    const categories = CategoryRepo.getAllCategories();
    return categories.find((category) => category.name === catName);
  }

  //this function will update category by category id
  static updateCategory(catId, updatedCategory) {
    const categories = CategoryRepo.getAllCategories();
    const index = categories.findIndex((category) => category.Id === catId);

    if (index != -1) {
      categories[index] = updatedCategory;
      CategoryRepo.saveCategories(categories);
      return true;
    }
    return false;
  }

  //this function will get
}
