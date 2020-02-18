const express = require(`express`);
const router = express.Router();
const axios = require(`axios`);
const City = require(`../../server/models/City`);

router.get(`/city/:cityName`, async function(req, res) {
  const cityName = req.params.cityName;
  const apiKey = `f1d6beeb607ad85112dc0b319f587c36`;
  let bigData = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  );
  let data = {
    name: bigData.data.name,
    temperature: bigData.data.main.temp,
    condition: bigData.data.weather[0].description,
    conditionPic: bigData.data.weather[0].icon
  };
  res.send(data);
});

router.post(`/city`, async function(req, res) {
  let cityData = req.body;
  let city = new City(cityData);
  await city.save();
  res.end();
});

router.delete(`/city/:cityName`, async function(req, res) {
  const cityName = req.params.cityName;
  await City.findOneAndDelete({ name: cityName});
  res.end();
});

router.get(`/cities`, async function(req, res) {
  let citiesData = await City.find({});
  res.send(citiesData);
});

module.exports = router;
