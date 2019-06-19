const images = require("./images");
const auth = require("./auth");

module.exports = class API {
  static init(baseRoute, app, mongoose) {
    images.init(baseRoute, app, mongoose);
    auth.init(baseRoute, app, mongoose);
  }
};
