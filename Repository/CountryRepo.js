// This class manages the country data stored in localStorage.
export class CountryRepo {
  // Retrieves all countries from localStorage.
  static getAllCountries() {
    return JSON.parse(localStorage.getItem("Countries")) || [];
  }

  // Saves an array of countries to localStorage.
  static saveCountries(countries) {
    localStorage.setItem("Countries", JSON.stringify(countries));
  }

  // Adds a new country to the list of countries stored in localStorage.
  static addCountry(country) {
    const existingCountries = CountryRepo.getAllCountries(); // Get the current list of countries
    existingCountries.push(country); // Add the new country to the list
    CountryRepo.saveCountries(existingCountries); // Save the updated list of countries
  }

  // Deletes a country by its ID from localStorage.
  static deleteCountry(countryId) {
    const existingCountries = CountryRepo.getAllCountries(); // Get the current list of countries
    const updatedCountries = existingCountries.filter(
      (country) => country.id !== countryId // Remove the country with the matching ID
    );
    CountryRepo.saveCountries(updatedCountries); // Save the updated list of countries
  }

  // Updates an existing country by its ID with new data.
  static updateCountry(countryId, updatedCountry) {
    const existingCountries = CountryRepo.getAllCountries(); // Get the current list of countries
    const index = existingCountries.findIndex(
      (country) => country.id === countryId // Find the country by its ID
    );
    if (index !== -1) {
      existingCountries[index] = updatedCountry; // Update the country if found
      CountryRepo.saveCountries(existingCountries); // Save the updated list of countries
    }
  }
}
