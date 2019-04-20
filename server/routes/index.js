const images = require("./images");

module.exports = class API {
  static init(baseRoute, app, mongoose) {
    images.init(baseRoute, app, mongoose);
  }
};
