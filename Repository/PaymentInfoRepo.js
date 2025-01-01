export class PaymentInfoRepo {
  static getAllPaymentInfoRepo() {
    return JSON.parse(localStorage.getItem("PaymentInformations"));
  }

  static savePayments(payments) {
    localStorage.setItem("PaymentInformations", JSON.stringify(payments));
  }

  static deletePayment(paymentId) {
    let payments = PaymentInfoRepo.getAllPaymentInfoRepo();
    payments = payments.filter((payment) => payment.id !== paymentId);
    PaymentInfoRepo.savePayments(payments);
  }

  static updatePayment(paymentId, updatedPayment) {
    let payments = PaymentInfoRepo.getAllPaymentInfoRepo();
    let index = payments.findIndex((payment) => payment.id === paymentId);
    if (index != -1) {
      payments[index] = updatedPayment;
      return true;
    }
    return false;
  }
}
