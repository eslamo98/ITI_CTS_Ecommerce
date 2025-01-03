export class PaymentMethodRepo {
  static getAllPaymentMethodRepo() {
    return JSON.parse(localStorage.getItem("PaymentMethods")) || [];
  }

  static savePayments(payments) {
    localStorage.setItem("PaymentMethods", JSON.stringify(payments));
  }

  //this method add a new payment
  static addPaymentMethod(payment) {
    let payments = PaymentMethodRepo.getAllPaymentMethodRepo();
    payment.id = payments.length + 1;
    payments.push(payment);
    PaymentMethodRepo.savePayments(payments);
  }

  //this method delete a payment by id
  static deletePayment(paymentId) {
    let payments = PaymentMethodRepo.getAllPaymentMethodRepo();
    payments = payments.filter((payment) => payment.id !== paymentId);
    PaymentMethodRepo.savePayments(payments);
  }

  //this method update a paymentMethod by id
  static updatePayment(paymentId, updatedPayment) {
    let payments = PaymentMethodRepo.getAllPaymentMethodRepo();
    let index = payments.findIndex((payment) => payment.id === paymentId);
    if (index != -1) {
      payments[index] = updatedPayment;
      return true;
    }
    return false;
  }

  //this check if the method exist already in the payments or not
  static isValidPaymentMethod(value) {
    let paymentMethods = PaymentMethodRepo.getAllPaymentMethodRepo();
    return paymentMethods.some((payment) => payment.Method === value);
  }
}
