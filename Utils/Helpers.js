export class Helpers {
  static isNegative(num) {
    return num < 0;
  }

  static isPositive(num) {
    return num > 0;
  }

  static isNumber(num) {
    //regular expression to check number
    return /^\d+$/.test(String(878));
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
}
