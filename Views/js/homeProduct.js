import { ProductRepo } from "../../Repository/ProductRepo.js";
import { DbRepo } from "../../Repository/DbRepo.js";

// تنظيف localStorage وإعداد البيانات
localStorage.clear();
DbRepo.setUpLocalStorage();

// دالة لاختيار عدد معين من المنتجات بشكل عشوائي
function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random()); // نخلط المنتجات بشكل عشوائي
    return shuffled.slice(0, count); // نأخذ أول "count" منتجات من القائمة المخلوطة
}

// دالة لإنشاء الكاردس
function generateProductCards(containerId, products) {
    const container = document.getElementById(containerId); // نجيب الـ container باستخدام الـ id
    container.innerHTML = ''; // نمسح أي محتوى قديم

    // نعمل لوب على كل المنتجات وننشئ كاردس لكل منتج
    products.forEach(product => {
        const cardHTML = `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="card">
                    <img src="${product.imgPath}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 mb-0 price">$${product.price.toFixed(2)}</span>
                            <div>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star-half-alt text-warning"></i>
                                <small class="text-muted">(4.5)</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-center">
                        <button class="btn btn-primary btn-sm">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML; // نضيف الكاردس إلى الـ container
    });
}

// نجيب كل المنتجات
const allProducts = ProductRepo.GetAllProducts();

// نستخدم الفانكشن لأول صف كاردس مع 4 منتجات عشوائية
generateProductCards('product-cards-1', getRandomProducts(allProducts, 4));

// نستخدم الفانكشن لصف كاردس تاني مع 4 منتجات عشوائية
generateProductCards('product-cards-2', getRandomProducts(allProducts, 4));

// دالة للبحث عن منتج
document.getElementById('search-input').addEventListener('input', function() {
    const searchTerm = this.value; // نجيب الكلمة اللي المستخدم كتبها
    const products = ProductRepo.GetAllProducts(); // نجيب كل المنتجات

    // نفلتر المنتجات بناءً على الكلمة المدخلة
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // نعرض المنتجات المفلترة في الصف الأول
    generateProductCards('product-cards-1', filteredProducts.slice(0, 4)); // أول 4 منتجات

    // نعرض المنتجات المفلترة في الصف التاني
    generateProductCards('product-cards-2', filteredProducts.slice(4, 8)); // المنتجات من 5 إلى 8
});