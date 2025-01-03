export class Helpers {
  static isNegative(num) {
    return num < 0;
  }

  static isPositive(num) {
    return num > 0;
  }

  static isNumber(num) {
    //regular expression to check number
    return !isNaN(Number(num));
  }

  static isOnlyText(str) {
    // regular expression to test the str contains only letters
    return /^[a-zA-Z]+$/.test(str);
  }

  static isValidPhone(phone) {
    // regular expression to test the phone number format
    // +20 010 170-89162 or +20 010 170 89162
    return /^\+\d{1,3} \d{3} \d{3}{-, }\d{4,5}$/.test(phone);
  }

  static isBetween(lower, upper) {
    return num >= lower && num <= upper;
  }

  static stringLengthGOrEqual(str, len) {
    return str.length >= len;
  }

  static isEmail(email) {
    // regular expression to test the email format
    // example@example.com
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static isNotNullOrEmpty(value) {
    if (value?.trim() === "") return false;
    return value !== null && value !== undefined && value !== "";
  }
}
