import { OrderStatus } from "../Config/OrderStatus.js";

export class Helpers {
  // Checks if a number is negative
  static isNegative(num) {
    return num < 0; // Returns true if the number is less than zero
  }

  // Checks if a number is positive
  static isPositive(num) {
    return num > 0; // Returns true if the number is greater than zero
  }

  // Checks if the input is a valid number
  static isNumber(num) {
    // Regular expression to check if the input is a valid number
    return !isNaN(Number(num)); // Returns true if the input can be converted to a valid number
  }

  // Checks if a string contains only letters (no numbers or special characters)
  static isOnlyText(str) {
    // Regular expression to test if the string contains only alphabetic characters (uppercase or lowercase)
    return /^[a-zA-Z]+$/.test(str); // Returns true if the string contains only letters
  }

  // Validates a phone number format like "+20 010 170-89162" or "+20 010 170 89162"
  static isValidPhone(phone) {
    // Regular expression to validate phone number with specific formats
    return /^\+\d{1,3} \d{3} \d{3}[-, ]?\d{4,5}$/.test(phone); // Returns true if the phone number matches the pattern
  }

  // Checks if a number is between the given lower and upper bounds (inclusive)
  static isBetween(num, lower, upper) {
    return num >= lower && num <= upper; // Returns true if the number is within the specified range
  }

  // Checks if the string length is greater than or equal to a specified length
  static stringLengthGOrEqual(str, len) {
    return str.length >= len; // Returns true if the string's length is greater than or equal to the specified length
  }

  // Validates the email format (e.g., example@example.com)
  static isEmail(email) {
    // Regular expression to validate the email format
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Returns true if the email matches the pattern
  }

  // Checks if a value is not null or empty (including whitespace)
  static isNotNullOrEmpty(value) {
    // Check if the value is not null, undefined, or an empty string (including strings with only whitespace)
    if (value?.trim() === "") return false;
    return value !== null && value !== undefined && value !== ""; // Returns true if the value is not null or empty
  }

  static myConsole(object, message) {
    console.log("_______________________________");
    console.log(`Message: ${message}`);
    console.log(object);
    console.log("_______________________________");
  }

  static GetPropperBadge(status) {
    switch (status) {
      case OrderStatus.PENDING:
        return `<span class="badge bg-warning text-dark">${OrderStatus.PENDING}</span>`;
      case OrderStatus.SHIPPED:
        return `<span class="badge bg-primary">${OrderStatus.SHIPPED}</span>`;
      case OrderStatus.COMPLETED:
        return `<span class="badge bg-success">${OrderStatus.COMPLETED}</span>`;
      case OrderStatus.CANCELLED:
        return `<span class="badge bg-danger">${OrderStatus.CANCELLED}</span>`;
      default:
        return `<span class="badge bg-secondary">N/A</span>`;
    }
  }
}
