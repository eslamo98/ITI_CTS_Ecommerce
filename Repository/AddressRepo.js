export class AddressRepo {
  static getAllAddress() {
    return JSON.parse(localStorage.getItem("Addresses"));
  }

  static saveAddresses(addresses) {
    localStorage.setItem("Addresses", JSON.stringify(addresses));
  }

  static getAddressById(addressId) {
    const addresses = this.getAllAddress() || [];
    return addresses.find((address) => address.id === addressId);
  }

  static addAddress(address) {
    const addresses = this.getAllAddress() || [];
    addresses.push(address);
    this.saveAddresses(addresses);
  }

  static updateAddress(id, updatedAddress) {
    const addresses = this.getAllAddress() || [];
    const index = addresses.findIndex((address) => address.id === id);
    if (index !== -1) {
      addresses[index] = updatedAddress;
      this.saveAddresses(addresses);
      return true;
    }
    return false;
  }
}
