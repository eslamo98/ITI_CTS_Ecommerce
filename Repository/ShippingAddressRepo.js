export class ShippingAddressRepo {
  static getAllShippingAddress() {
    return JSON.parse(localStorage.getItem("ShippingAddresses"));
  }

  static saveShippingAddresses(addresses) {
    localStorage.setItem("shippingAddresses", JSON.stringify(addresses));
  }

  static getAddressById(addressId) {
    const addresses = this.getAllShippingAddress() || [];
    return addresses.find((address) => address.id === addressId);
  }

  static addShippingAddress(address) {
    const addresses = this.getAllShippingAddress() || [];
    addresses.push(address);
    this.saveShippingAddresses(addresses);
  }

  static updateShippingAddress(id, updatedAddress) {
    const addresses = this.getAllShippingAddress() || [];
    const index = addresses.findIndex((address) => address.id === id);
    if (index !== -1) {
      addresses[index] = updatedAddress;
      this.saveShippingAddresses(addresses);
      return true;
    }
    return false;
  }
}
