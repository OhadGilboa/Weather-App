class TempManager {
  constructor() {
    this.cityData = [];
  }

  async getDataFromDB() {
    let citiesData = await $.get(`/cities`);
    this.cityData = citiesData;
    // citiesData.forEach(d => this.cityData.push(d))
  }

  async getCityData(cityName) {
    let cityData = await $.get(`/city/${cityName}`);
    this.cityData.push(cityData);
  }

  async saveCity(cityName, index) {
    let postBodyData = this.cityData.find(c => c.name == cityName);
    await $.post(`/city`, postBodyData);
    this.cityData[index]._id = true
  }

  async removeCity(cityName, index) {
    await $.ajax({
      url: `/city/${cityName}`,
      type: `DELETE`,
      success: function() {}
    });
    this.cityData.splice(index, 1)
  }
}
