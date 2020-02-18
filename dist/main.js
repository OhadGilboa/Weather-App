const tempManager = new TempManager();
const renderer = new Renderer();

const loadPage = async function() {
  await tempManager.getDataFromDB();
  renderer.renderData(tempManager.cityData);
};

loadPage();

const handleSearch = async function(cityName) {
  await tempManager.getCityData(cityName);
  renderer.renderData(tempManager.cityData); 
  //NOT loadPage()!!! because I need it to use the data from the api not the DB
};

$(`body`).on(`click`, `#searchCity`, function() {
  let input = $(`#cityInput`).val();
  handleSearch(input);
});

$(`#cityData`).on(`click`, `.save`, async function() {
    let name = $(this).siblings()[0].textContent
    const index = tempManager.cityData.findIndex(c => c.name == name)
    await tempManager.saveCity(name, index)
    renderer.renderData(tempManager.cityData);

})

$(`#cityData`).on(`click`, `.delete`, async function() {
    let name = $(this).siblings()[0].textContent
    const index = tempManager.cityData.findIndex(c => c.name == name)
    await tempManager.removeCity(name, index)
    renderer.renderData(tempManager.cityData);
})
