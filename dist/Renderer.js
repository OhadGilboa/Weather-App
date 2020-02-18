const source = $(`#city-template`).html();
const template = Handlebars.compile(source);

class Renderer {
  renderData(data) {
    const newHTML = template({ data });
    $(`#cityData`).empty();
    $(`#cityData`).append(newHTML);
  }
}

