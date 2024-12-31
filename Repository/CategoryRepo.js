export class CategoryRepo {
  static getAllCategories() {
    return localStorage.getItem("Categories") || [];
  }

  static saveCategories(categories) {
    localStorage.setItem("Categories", JSON.stringify(categories));
  }

  static addCategory(category) {
    const existingCategories = this.getAllCategories();
    existingCategories.push(category);
    this.saveCategories(existingCategories);
  }

  static getCategoryById(catId) {
    const categories = this.getAllCategories();
    return categories.find((category) => category.id === catId);
  }

  static getCategoryByName(catName) {
    const categories = this.getAllCategories();
    return categories.find((category) => category.name === catName);
  }
}
