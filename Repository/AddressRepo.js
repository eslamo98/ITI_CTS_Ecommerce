// This class manages the address data stored in localStorage.
export class AddressRepo {

  // Retrieves all stored addresses from localStorage.
  static getAllAddress() {
    return JSON.parse(localStorage.getItem("Addresses"));
  }

  // Saves an array of addresses to localStorage.
  static saveAddresses(addresses) {
    localStorage.setItem("Addresses", JSON.stringify(addresses));
  }

  // Retrieves a specific address by its ID.
  static getAddressById(addressId) {
    const addresses = this.getAllAddress() || []; // Fallback to an empty array if no addresses are found
    return addresses.find((address) => address.id === addressId); // Find and return the address by its ID
  }

  // Adds a new address to the list of addresses stored in localStorage.
  static addAddress(address) {
    const addresses = this.getAllAddress() || []; // Fallback to an empty array if no addresses are found
    addresses.push(address); // Add the new address to the list
    this.saveAddresses(addresses); // Save the updated list of addresses
  }

  // Updates an existing address by its ID with new data.
  static updateAddress(id, updatedAddress) {
    const addresses = this.getAllAddress() || []; // Fallback to an empty array if no addresses are found
    const index = addresses.findIndex((address) => address.id === id); // Find the address by its ID
    if (index !== -1) {
      addresses[index] = updatedAddress; // Update the address if found
      this.saveAddresses(addresses); // Save the updated list of addresses
      return true; // Return true indicating the update was successful
    }
    return false; // Return false if the address was not found
  }
}
