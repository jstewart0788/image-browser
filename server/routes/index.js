const images = require("./images");
const auth = require("./auth");
const tags = require("./tag");

module.exports = class API {
  static init(baseRoute, app, mongoose) {
    images.init(baseRoute, app, mongoose);
    auth.init(baseRoute, app, mongoose);
    tags.init(baseRoute, app, mongoose);
  }
};
