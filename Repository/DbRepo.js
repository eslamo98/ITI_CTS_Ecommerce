import { CategoryRepo } from "./CategoryRepo.js";
import { ProductRepo } from "./ProductRepo.js";
import { CountryRepo } from "./CountryRepo.js";
import { ShoppingCartRepo } from "./ShoppingCartRepo.js";
import { OrderRepo } from "./OrderRepo.js";
import { RoleRepo } from "./RoleRepo.js";
import { UsersRepo } from "./UsersRepo.js";
import { Category } from "../Models/Category.js";
import { Product } from "../Models/Product.js";
import { User } from "../Models/User.js";
import { Role } from "../Models/Role.js";
import { ShoppingCart } from "../Models/ShoppingCart.js";
import { ShoppingCartItem } from "../Models/ShoppingCartItem.js";
import { Address } from "../Models/Address.js";
import { Country } from "../Models/Country.js";
import { Order } from "../Models/Order.js";
import { PaymentMethod } from "../Models/PaymentMethod.js";
import { PaymentMethodRepo } from "./PaymentMethodRepo.js";

export class DbRepo {
  static saveIndex(index) {
    localStorage.setItem("index", JSON.stringify(index));
  }
  static getIndex() {
    return JSON.parse(localStorage.getItem("index"));
  }
  static SeedLocalStorage() {
    localStorage.clear();
    CategoryRepo.saveCategories([
      new Category("All").toJSON(),
      new Category("Electronics").toJSON(),
      new Category("Clothes").toJSON(),
      new Category("Furnture").toJSON(),
      new Category("Fashion").toJSON(),
      new Category("MakeUp").toJSON(),
      new Category("Test").toJSON(),
    ]);

    const productsData = [
      new Product(
        "Annibale Colombo Bed",
        1199.99,
        50,
        "A luxurious bed designed for ultimate comfort.",
        1,
        "Images/Products/Annibale Colombo Bed.jpg",
        3
      ).toJSON(),
      new Product(
        "Annibale Colombo Sofa",
        799.99,
        30,
        "A stylish and comfortable sofa for any living space.",
        1,
        "Images/Products/Annibale Colombo Sofa.jpg",
        3
      ).toJSON(),
      new Product(
        "Apple",
        1.99,
        100,
        "Fresh and organic apples, perfect for a healthy snack.",
        2,
        "Images/Products/Apple.jpg",
        3
      ).toJSON(),
      new Product(
        "Beef Steak",
        15.99,
        25,
        "Premium quality beef steak, perfect for grilling.",
        3,
        "Images/Products/Beef Steak.jpg",
        3
      ).toJSON(),
      new Product(
        "Bedside Table African Cherry",
        199.99,
        20,
        "A bedside table crafted from African Cherry wood.",
        1,
        "Images/Products/Bedside Table African Cherry.jpg",
        3
      ).toJSON(),
      new Product(
        "Calvin Klein CK One",
        39.99,
        50,
        "A unisex fragrance that exudes elegance and freshness.",
        4,
        "Images/Products/Calvin Klein CK One.jpg",
        3
      ).toJSON(),
      new Product(
        "Camera",
        499.99,
        15,
        "A high-performance camera for capturing stunning images.",
        4,
        "Images/Products/camera.jpg",
        3
      ).toJSON(),
      new Product(
        "Cat Food",
        19.99,
        40,
        "Nutritious and delicious food for your feline friends.",
        3,
        "Images/Products/Cat Food.jpg",
        2
      ).toJSON(),
      new Product(
        "Chicken Meat",
        8.99,
        30,
        "Fresh and tender chicken meat, ideal for cooking.",
        3,
        "Images/Products/Chicken Meat.jpg",
        3
      ).toJSON(),
      new Product(
        "Cooking Oil",
        5.99,
        100,
        "High-quality cooking oil for everyday use.",
        3,
        "Images/Products/Cooking Oil.jpg",
        2
      ).toJSON(),
      new Product(
        "Cucumber",
        1.49,
        80,
        "Crisp and refreshing cucumbers for salads and snacks.",
        2,
        "Images/Products/Cucumber.jpg",
        2
      ).toJSON(),
      new Product(
        "Dog Food",
        24.99,
        50,
        "Healthy and nutritious food for your dogs.",
        3,
        "Images/Products/Dog Food.jpg",
        2
      ).toJSON(),
      new Product(
        "Dolce Shine Eau de Parfum",
        59.99,
        30,
        "A vibrant fragrance that embodies sunshine and joy.",
        4,
        "Images/Products/Dolce Shine Eau de.jpg",
        2
      ).toJSON(),
      new Product(
        "Dior J'adore",
        89.99,
        20,
        "A classic fragrance with floral and fruity notes.",
        4,
        "Images/Products/Dior J'adore.jpg",
        2
      ).toJSON(),
      new Product(
        "Eggs",
        3.99,
        60,
        "Farm-fresh eggs, ideal for breakfast and baking.",
        3,
        "Images/Products/Eggs.jpg",
        2
      ).toJSON(),
      new Product(
        "Essence Mascara Lash Princess",
        9.99,
        40,
        "A mascara that gives your lashes a stunning look.",
        4,
        "Images/Products/Essence Mascara Lash Princess.jpg",
        2
      ).toJSON(),
      new Product(
        "Eyeshadow Palette with Mirror",
        29.99,
        20,
        "A versatile eyeshadow palette with a built-in mirror.",
        4,
        "Images/Products/Eyeshadow Palette with Mirror.jpg",
        2
      ).toJSON(),
      new Product(
        "Fish Steak",
        12.99,
        25,
        "Fresh fish steak, perfect for a gourmet meal.",
        3,
        "Images/Products/Fish Steak.jpg",
        2
      ).toJSON(),
      new Product(
        "Green Bell Pepper",
        2.49,
        70,
        "Fresh and crisp green bell peppers, perfect for cooking.",
        2,
        "Images/Products/Green Bell Pepper.jpg",
        2
      ).toJSON(),
      new Product(
        "Green Chili Pepper",
        1.99,
        50,
        "Hot and spicy green chili peppers for flavor.",
        2,
        "Images/Products/Green Chili Pepper.jpg",
        2
      ).toJSON(),
      new Product(
        "Gucci Bloom Eau de Parfum",
        69.99,
        25,
        "A sophisticated fragrance inspired by a blooming garden.",
        4,
        "Images/Products/Gucci Bloom Eau de.jpg",
        2
      ).toJSON(),
      new Product(
        "Honey Jar",
        6.99,
        40,
        "Pure and natural honey in a convenient jar.",
        3,
        "Images/Products/Honey Jar.jpg",
        2
      ).toJSON(),
      new Product(
        "Ice Cream",
        4.99,
        50,
        "Creamy and delicious ice cream, perfect for dessert.",
        3,
        "Images/Products/Ice Cream.jpg",
        2
      ).toJSON(),
      new Product(
        "Juice",
        3.49,
        100,
        "Refreshing and healthy juice for any time of day.",
        3,
        "Images/Products/Juice.jpg",
        2
      ).toJSON(),
      new Product(
        "Knoll Saarinen Executive Conference Chair",
        349.99,
        10,
        "A stylish and comfortable chair for your workspace.",
        1,
        "Images/Products/Knoll Saarinen Executive Conference Chair.jpg",
        2
      ).toJSON(),
      new Product(
        "Mobile",
        299.99,
        20,
        "A smartphone with advanced features and capabilities.",
        4,
        "Images/Products/mobile.jpg",
        2
      ).toJSON(),
      new Product(
        "Powder Canister",
        14.99,
        30,
        "A versatile powder canister for kitchen storage.",
        3,
        "Images/Products/Powder Canister.jpg",
        2
      ).toJSON(),
      new Product(
        "Red Lipstick",
        12.99,
        50,
        "A vibrant red lipstick for a bold look.",
        4,
        "Images/Products/Red Lipstick.jpg",
        2
      ).toJSON(),
      new Product(
        "Red Nail Polish",
        7.99,
        40,
        "A long-lasting red nail polish for stylish nails.",
        4,
        "Images/Products/Red Nail Polish.jpg",
        2
      ).toJSON(),
      new Product(
        "TV",
        899.99,
        10,
        "A high-definition TV for an exceptional viewing experience.",
        4,
        "Images/Products/TV.jpg",
        2
      ).toJSON(),
      new Product(
        "Wooden Bathroom Sink with Mirror",
        499.99,
        5,
        "A stylish wooden sink with an attached mirror for bathrooms.",
        1,
        "Images/Products/Wooden Bathroom Sink with Mirror.jpg",
        2
      ).toJSON(),
    ];

    ProductRepo.saveProducts(productsData);

    const ordersData = [
      new Order(
        4, // User ID
        "2025-01-01", // Order Date
        "Pending", // Status
        [
          new ShoppingCartItem(1, "Annibale Colombo Bed", 1, 1199.99),
          new ShoppingCartItem(2, "Annibale Colombo Sofa", 1, 799.99),
        ], // Cart Items
        new Address("123 Main St", "New York", "NY", "10001", "USA"), // Shipping Address
        PaymentMethodRepo.getPaymentByName("Credit Card") // Payment Method
      ),
      new Order(
        4,
        "2025-01-02",
        "Shipped",
        [
          new ShoppingCartItem(3, "Apple", 5, 1.99),
          new ShoppingCartItem(4, "Beef Steak", 2, 15.99),
        ],
        new Address("456 Elm St", "Los Angeles", "CA", "90001", "USA"),
        PaymentMethodRepo.getPaymentByName("PayPal")
      ),
      new Order(
        5,
        "2025-01-03",
        "Delivered",
        [
          new ShoppingCartItem(5, "Bedside Table African Cherry", 1, 199.99),
          new ShoppingCartItem(6, "Calvin Klein CK One", 1, 39.99),
        ],
        new Address("789 Oak St", "Chicago", "IL", "60601", "USA"),
        PaymentMethodRepo.getPaymentByName("Bank Transfer")
      ),
      new Order(
        4,
        "2025-01-04",
        "Pending",
        [
          new ShoppingCartItem(7, "Camera", 1, 499.99),
          new ShoppingCartItem(8, "Cat Food", 3, 19.99),
        ],
        new Address("321 Pine St", "Houston", "TX", "77001", "USA"),
        PaymentMethodRepo.getPaymentByName("Cash on Delivery")
      ),
      new Order(
        5,
        "2025-01-05",
        "Cancelled",
        [
          new ShoppingCartItem(9, "Chicken Meat", 2, 8.99),
          new ShoppingCartItem(10, "Cooking Oil", 1, 5.99),
        ],
        new Address("654 Maple St", "Phoenix", "AZ", "85001", "USA"),
        PaymentMethodRepo.getPaymentByName("Credit Card")
      ),
      new Order(
        6,
        "2025-01-06",
        "Shipped",
        [
          new ShoppingCartItem(11, "Cucumber", 10, 1.49),
          new ShoppingCartItem(12, "Dog Food", 2, 24.99),
        ],
        new Address("987 Cedar St", "Philadelphia", "PA", "19101", "USA"),
        PaymentMethodRepo.getPaymentByName("PayPal")
      ),
      new Order(
        7,
        "2025-01-07",
        "Delivered",
        [
          new ShoppingCartItem(13, "Dolce Shine Eau de Parfum", 1, 59.99),
          new ShoppingCartItem(14, "Dior J'adore", 1, 89.99),
        ],
        new Address("159 Birch St", "San Antonio", "TX", "78201", "USA"),
        PaymentMethodRepo.getPaymentByName("Credit Card")
      ),
      new Order(
        8,
        "2025-01-08",
        "Pending",
        [
          new ShoppingCartItem(15, "Eggs", 12, 3.99),
          new ShoppingCartItem(16, "Essence Mascara Lash Princess", 1, 9.99),
        ],
        new Address("753 Spruce St", "San Diego", "CA", "92101", "USA"),
        PaymentMethodRepo.getPaymentByName("Bank Transfer")
      ),
      new Order(
        9,
        "2025-01-09",
        "Shipped",
        [
          new ShoppingCartItem(17, "Eyeshadow Palette with Mirror", 1, 29.99),
          new ShoppingCartItem(18, "Fish Steak", 1, 12.99),
        ],
        new Address("159 Redwood St", "Dallas", "TX", "75201", "USA"),
        PaymentMethodRepo.getPaymentByName("Credit Card")
      ),
      new Order(
        10,
        "2025-01-10",
        "Delivered",
        [
          new ShoppingCartItem(19, "Green Bell Pepper", 6, 2.49),
          new ShoppingCartItem(20, "Green Chili Pepper", 8, 1.99),
        ],
        new Address("456 Cypress St", "San Jose", "CA", "95101", "USA"),
        PaymentMethodRepo.getPaymentByName("PayPal")
      ),
      new Order(
        10,
        "2025-01-11",
        "Cancelled",
        [
          new ShoppingCartItem(21, "Gucci Bloom Eau de Parfum", 1, 69.99),
          new ShoppingCartItem(22, "Honey Jar", 2, 6.99),
        ],
        new Address("321 Dogwood St", "Austin", "TX", "73301", "USA"),
        PaymentMethodRepo.getPaymentByName("Cash on Delivery")
      ),
      new Order(
        5,
        "2025-01-12",
        "Pending",
        [
          new ShoppingCartItem(23, "Ice Cream", 3, 4.99),
          new ShoppingCartItem(24, "Juice", 5, 3.49),
        ],
        new Address("654 Palm St", "Fort Worth", "TX", "76101", "USA"),
        PaymentMethodRepo.getPaymentByName("Credit Card")
      ),
      new Order(
        5,
        "2025-01-13",
        "Shipped",
        [
          new ShoppingCartItem(25, "Knoll Saarinen Executive Chair", 1, 349.99),
          new ShoppingCartItem(26, "Mobile", 1, 299.99),
        ],
        new Address("159 Walnut St", "Jacksonville", "FL", "32099", "USA"),
        PaymentMethodRepo.getPaymentByName("Bank Transfer")
      ),
      new Order(
        7,
        "2025-01-14",
        "Delivered",
        [
          new ShoppingCartItem(27, "Powder Canister", 1, 14.99),
          new ShoppingCartItem(28, "Red Lipstick", 1, 12.99),
        ],
        new Address("753 Chestnut St", "Columbus", "OH", "43004", "USA"),
        PaymentMethodRepo.getPaymentByName("PayPal")
      ),
      new Order(
        8,
        "2025-01-15",
        "Cancelled",
        [
          new ShoppingCartItem(29, "Red Nail Polish", 2, 7.99),
          new ShoppingCartItem(30, "TV", 1, 899.99),
        ],
        new Address("987 Elmwood St", "Charlotte", "NC", "28201", "USA"),
        PaymentMethodRepo.getPaymentByName("Credit Card")
      ),

      new Order(
        5,
        "2025-01-05",
        "Cancelled",
        [new ShoppingCartItem(1, "Annibale Colombo Bed", 1, 1199.99)],
        new Address("654 Maple St", "Phoenix", "AZ", "85001", "USA"),
        PaymentMethodRepo.getPaymentByName("Credit Card")
      ),
    ];

    OrderRepo.saveOrders(ordersData);

    RoleRepo.saveRoles([
      new Role("Admin").toJSON(),
      new Role("Seller").toJSON(),
      new Role("Customer").toJSON(),
    ]);

    // List of first names from the images in the screenshot
    const firstNames = [
      "Abigail",
      "Addison",
      "Alexander",
      "Avat",
      "Avery",
      "Charlotte",
      "Chloe",
      "Daniel",
      "Elijah",
      "Emily",
      "Evelyn",
      "Evelyn",
      "Harper",
      "Henry",
      "Isabella",
      "Jackson",
      "James",
      "Liam",
      "Emma",
      "Ethan",
      "Evelyn",
      "Lily",
      "Logan",
      "Madison",
      "Mateo",
      "Miar",
      "Michael",
      "Noah",
      "Olivia",
      "Sophia",
      "William",
    ];
    // Generating users with the corresponding images
    const users = firstNames.map((firstName, index) => {
      return new User(
        `${firstName} User`,
        firstName,
        "User",
        1000000 + index,
        `${firstName.toLowerCase()}@example.com`,
        index === 0 ? 1 : index <= 2 ? 2 : 3, // Admin for the first, Seller for the next two, Customer for the rest
        "password123",
        new Address("123 Main St", "City", "State", 10001, "Country"),
        `Images/Users/${firstName.toLowerCase()}.jpg` // Path to the user's image
      ).toJSON();
    });

    // Save users to the repository
    UsersRepo.saveUsers(users);

    let countriesJson = [
      { name: "Afghanistan", code: "AF" },
      { name: "Åland Islands", code: "AX" },
      { name: "Albania", code: "AL" },
      { name: "Algeria", code: "DZ" },
      { name: "American Samoa", code: "AS" },
      { name: "AndorrA", code: "AD" },
      { name: "Angola", code: "AO" },
      { name: "Anguilla", code: "AI" },
      { name: "Antarctica", code: "AQ" },
      { name: "Antigua and Barbuda", code: "AG" },
      { name: "Argentina", code: "AR" },
      { name: "Armenia", code: "AM" },
      { name: "Aruba", code: "AW" },
      { name: "Australia", code: "AU" },
      { name: "Austria", code: "AT" },
      { name: "Azerbaijan", code: "AZ" },
      { name: "Bahamas", code: "BS" },
      { name: "Bahrain", code: "BH" },
      { name: "Bangladesh", code: "BD" },
      { name: "Barbados", code: "BB" },
      { name: "Belarus", code: "BY" },
      { name: "Belgium", code: "BE" },
      { name: "Belize", code: "BZ" },
      { name: "Benin", code: "BJ" },
      { name: "Bermuda", code: "BM" },
      { name: "Bhutan", code: "BT" },
      { name: "Bolivia", code: "BO" },
      { name: "Bosnia and Herzegovina", code: "BA" },
      { name: "Botswana", code: "BW" },
      { name: "Bouvet Island", code: "BV" },
      { name: "Brazil", code: "BR" },
      { name: "British Indian Ocean Territory", code: "IO" },
      { name: "Brunei Darussalam", code: "BN" },
      { name: "Bulgaria", code: "BG" },
      { name: "Burkina Faso", code: "BF" },
      { name: "Burundi", code: "BI" },
      { name: "Cambodia", code: "KH" },
      { name: "Cameroon", code: "CM" },
      { name: "Canada", code: "CA" },
      { name: "Cape Verde", code: "CV" },
      { name: "Cayman Islands", code: "KY" },
      { name: "Central African Republic", code: "CF" },
      { name: "Chad", code: "TD" },
      { name: "Chile", code: "CL" },
      { name: "China", code: "CN" },
      { name: "Christmas Island", code: "CX" },
      { name: "Cocos (Keeling) Islands", code: "CC" },
      { name: "Colombia", code: "CO" },
      { name: "Comoros", code: "KM" },
      { name: "Congo", code: "CG" },
      { name: "Congo, The Democratic Republic of the", code: "CD" },
      { name: "Cook Islands", code: "CK" },
      { name: "Costa Rica", code: "CR" },
      { name: "Cote D'Ivoire", code: "CI" },
      { name: "Croatia", code: "HR" },
      { name: "Cuba", code: "CU" },
      { name: "Cyprus", code: "CY" },
      { name: "Czech Republic", code: "CZ" },
      { name: "Denmark", code: "DK" },
      { name: "Djibouti", code: "DJ" },
      { name: "Dominica", code: "DM" },
      { name: "Dominican Republic", code: "DO" },
      { name: "Ecuador", code: "EC" },
      { name: "Egypt", code: "EG" },
      { name: "El Salvador", code: "SV" },
      { name: "Equatorial Guinea", code: "GQ" },
      { name: "Eritrea", code: "ER" },
      { name: "Estonia", code: "EE" },
      { name: "Ethiopia", code: "ET" },
      { name: "Falkland Islands (Malvinas)", code: "FK" },
      { name: "Faroe Islands", code: "FO" },
      { name: "Fiji", code: "FJ" },
      { name: "Finland", code: "FI" },
      { name: "France", code: "FR" },
      { name: "French Guiana", code: "GF" },
      { name: "French Polynesia", code: "PF" },
      { name: "French Southern Territories", code: "TF" },
      { name: "Gabon", code: "GA" },
      { name: "Gambia", code: "GM" },
      { name: "Georgia", code: "GE" },
      { name: "Germany", code: "DE" },
      { name: "Ghana", code: "GH" },
      { name: "Gibraltar", code: "GI" },
      { name: "Greece", code: "GR" },
      { name: "Greenland", code: "GL" },
      { name: "Grenada", code: "GD" },
      { name: "Guadeloupe", code: "GP" },
      { name: "Guam", code: "GU" },
      { name: "Guatemala", code: "GT" },
      { name: "Guernsey", code: "GG" },
      { name: "Guinea", code: "GN" },
      { name: "Guinea-Bissau", code: "GW" },
      { name: "Guyana", code: "GY" },
      { name: "Haiti", code: "HT" },
      { name: "Heard Island and Mcdonald Islands", code: "HM" },
      { name: "Holy See (Vatican City State)", code: "VA" },
      { name: "Honduras", code: "HN" },
      { name: "Hong Kong", code: "HK" },
      { name: "Hungary", code: "HU" },
      { name: "Iceland", code: "IS" },
      { name: "India", code: "IN" },
      { name: "Indonesia", code: "ID" },
      { name: "Iran, Islamic Republic Of", code: "IR" },
      { name: "Iraq", code: "IQ" },
      { name: "Ireland", code: "IE" },
      { name: "Isle of Man", code: "IM" },
      { name: "Israel", code: "IL" },
      { name: "Italy", code: "IT" },
      { name: "Jamaica", code: "JM" },
      { name: "Japan", code: "JP" },
      { name: "Jersey", code: "JE" },
      { name: "Jordan", code: "JO" },
      { name: "Kazakhstan", code: "KZ" },
      { name: "Kenya", code: "KE" },
      { name: "Kiribati", code: "KI" },
      { name: "Korea, Democratic People'S Republic of", code: "KP" },
      { name: "Korea, Republic of", code: "KR" },
      { name: "Kuwait", code: "KW" },
      { name: "Kyrgyzstan", code: "KG" },
      { name: "Lao People'S Democratic Republic", code: "LA" },
      { name: "Latvia", code: "LV" },
      { name: "Lebanon", code: "LB" },
      { name: "Lesotho", code: "LS" },
      { name: "Liberia", code: "LR" },
      { name: "Libyan Arab Jamahiriya", code: "LY" },
      { name: "Liechtenstein", code: "LI" },
      { name: "Lithuania", code: "LT" },
      { name: "Luxembourg", code: "LU" },
      { name: "Macao", code: "MO" },
      { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
      { name: "Madagascar", code: "MG" },
      { name: "Malawi", code: "MW" },
      { name: "Malaysia", code: "MY" },
      { name: "Maldives", code: "MV" },
      { name: "Mali", code: "ML" },
      { name: "Malta", code: "MT" },
      { name: "Marshall Islands", code: "MH" },
      { name: "Martinique", code: "MQ" },
      { name: "Mauritania", code: "MR" },
      { name: "Mauritius", code: "MU" },
      { name: "Mayotte", code: "YT" },
      { name: "Mexico", code: "MX" },
      { name: "Micronesia, Federated States of", code: "FM" },
      { name: "Moldova, Republic of", code: "MD" },
      { name: "Monaco", code: "MC" },
      { name: "Mongolia", code: "MN" },
      { name: "Montserrat", code: "MS" },
      { name: "Morocco", code: "MA" },
      { name: "Mozambique", code: "MZ" },
      { name: "Myanmar", code: "MM" },
      { name: "Namibia", code: "NA" },
      { name: "Nauru", code: "NR" },
      { name: "Nepal", code: "NP" },
      { name: "Netherlands", code: "NL" },
      { name: "Netherlands Antilles", code: "AN" },
      { name: "New Caledonia", code: "NC" },
      { name: "New Zealand", code: "NZ" },
      { name: "Nicaragua", code: "NI" },
      { name: "Niger", code: "NE" },
      { name: "Nigeria", code: "NG" },
      { name: "Niue", code: "NU" },
      { name: "Norfolk Island", code: "NF" },
      { name: "Northern Mariana Islands", code: "MP" },
      { name: "Norway", code: "NO" },
      { name: "Oman", code: "OM" },
      { name: "Pakistan", code: "PK" },
      { name: "Palau", code: "PW" },
      { name: "Palestinian Territory, Occupied", code: "PS" },
      { name: "Panama", code: "PA" },
      { name: "Papua New Guinea", code: "PG" },
      { name: "Paraguay", code: "PY" },
      { name: "Peru", code: "PE" },
      { name: "Philippines", code: "PH" },
      { name: "Pitcairn", code: "PN" },
      { name: "Poland", code: "PL" },
      { name: "Portugal", code: "PT" },
      { name: "Puerto Rico", code: "PR" },
      { name: "Qatar", code: "QA" },
      { name: "Reunion", code: "RE" },
      { name: "Romania", code: "RO" },
      { name: "Russian Federation", code: "RU" },
      { name: "RWANDA", code: "RW" },
      { name: "Saint Helena", code: "SH" },
      { name: "Saint Kitts and Nevis", code: "KN" },
      { name: "Saint Lucia", code: "LC" },
      { name: "Saint Pierre and Miquelon", code: "PM" },
      { name: "Saint Vincent and the Grenadines", code: "VC" },
      { name: "Samoa", code: "WS" },
      { name: "San Marino", code: "SM" },
      { name: "Sao Tome and Principe", code: "ST" },
      { name: "Saudi Arabia", code: "SA" },
      { name: "Senegal", code: "SN" },
      { name: "Serbia and Montenegro", code: "CS" },
      { name: "Seychelles", code: "SC" },
      { name: "Sierra Leone", code: "SL" },
      { name: "Singapore", code: "SG" },
      { name: "Slovakia", code: "SK" },
      { name: "Slovenia", code: "SI" },
      { name: "Solomon Islands", code: "SB" },
      { name: "Somalia", code: "SO" },
      { name: "South Africa", code: "ZA" },
      { name: "South Georgia and the South Sandwich Islands", code: "GS" },
      { name: "Spain", code: "ES" },
      { name: "Sri Lanka", code: "LK" },
      { name: "Sudan", code: "SD" },
      { name: "Suriname", code: "SR" },
      { name: "Svalbard and Jan Mayen", code: "SJ" },
      { name: "Swaziland", code: "SZ" },
      { name: "Sweden", code: "SE" },
      { name: "Switzerland", code: "CH" },
      { name: "Syrian Arab Republic", code: "SY" },
      { name: "Taiwan, Province of China", code: "TW" },
      { name: "Tajikistan", code: "TJ" },
      { name: "Tanzania, United Republic of", code: "TZ" },
      { name: "Thailand", code: "TH" },
      { name: "Timor-Leste", code: "TL" },
      { name: "Togo", code: "TG" },
      { name: "Tokelau", code: "TK" },
      { name: "Tonga", code: "TO" },
      { name: "Trinidad and Tobago", code: "TT" },
      { name: "Tunisia", code: "TN" },
      { name: "Turkey", code: "TR" },
      { name: "Turkmenistan", code: "TM" },
      { name: "Turks and Caicos Islands", code: "TC" },
      { name: "Tuvalu", code: "TV" },
      { name: "Uganda", code: "UG" },
      { name: "Ukraine", code: "UA" },
      { name: "United Arab Emirates", code: "AE" },
      { name: "United Kingdom", code: "GB" },
      { name: "United States", code: "US" },
      { name: "United States Minor Outlying Islands", code: "UM" },
      { name: "Uruguay", code: "UY" },
      { name: "Uzbekistan", code: "UZ" },
      { name: "Vanuatu", code: "VU" },
      { name: "Venezuela", code: "VE" },
      { name: "Viet Nam", code: "VN" },
      { name: "Virgin Islands, British", code: "VG" },
      { name: "Virgin Islands, U.S.", code: "VI" },
      { name: "Wallis and Futuna", code: "WF" },
      { name: "Western Sahara", code: "EH" },
      { name: "Yemen", code: "YE" },
      { name: "Zambia", code: "ZM" },
      { name: "Zimbabwe", code: "ZW" },
    ];
    // Convert countries data to an array of Country instances
    const countriesArray = countriesJson.map(
      (data) => new Country(data["name"], data["code"])
    );

    // Save the array of Country instances
    CountryRepo.saveCountries(countriesArray);

    // Create shopping carts using classes
    const shoppingCartsData = [
      new ShoppingCart(1, [
        new ShoppingCartItem(1, "Annibale Colombo Bed", 2, 1199.99),
        new ShoppingCartItem(4, "Beef Steak", 1, 15.99),
      ]).toJSON(),
      new ShoppingCart(2, [
        new ShoppingCartItem(7, "Camera", 1, 499.99),
        new ShoppingCartItem(8, "Cat Food", 2, 19.99),
      ]).toJSON(),
      new ShoppingCart(3, [
        new ShoppingCartItem(3, "Apple", 3, 1.99),
        new ShoppingCartItem(9, "Chicken Meat", 1, 8.99),
      ]).toJSON(),
    ];

    // Now shoppingCartsData contains instances of ShoppingCart and ShoppingCartItem
    console.log(shoppingCartsData);

    ShoppingCartRepo.saveShopingCarts(shoppingCartsData);
  }

  static setUpLocalStorage() {
    let index = this.getIndex() || 0;
    if (index == 0) {
      console.log("Hi i am supposed to be called only one time");
      this.SeedLocalStorage();
      this.saveIndex(1);
    }
  }
}
