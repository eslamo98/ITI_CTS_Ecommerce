export class Helpers {
  static isNegative(num) {
    return num < 0;
  }

  isPositive(num) {
    return num > 0;
  }

  isNumber(num) {
    return num.constructor.name === "Number";
  }
}
