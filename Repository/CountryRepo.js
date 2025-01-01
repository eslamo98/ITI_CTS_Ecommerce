export class CountryRepo {
  static getAllCountries() {
    return JSON.parse(localStorage.getItem("Countries"));
  }

  static saveCountries(countries) {
    localStorage.setItem("Countries", JSON.stringify(countries));
  }

  static addCountry(country) {
    const existingCountries = CountryRepo.getAllCountries();
    existingCountries.push(country);
    CountryRepo.saveCountries(existingCountries);
  }

  static deleteCountry(countryId) {
    const existingCountries = CountryRepo.getAllCountries();
    const updatedCountries = existingCountries.filter(
      (country) => country.id !== countryId
    );
    CountryRepo.saveCountries(updatedCountries);
  }

  static updateCountry(countryId, updatedCountry) {
    const existingCountries = CountryRepo.getAllCountries();
    const index = existingCountries.findIndex(
      (country) => country.id === countryId
    );
    if (index !== -1) {
      existingCountries[index] = updatedCountry;
      CountryRepo.saveCountries(existingCountries);
    }
  }
}
