const images = require("./images");
const auth = require("./auth");
const tags = require("./tag");
const messages = require("./message");

module.exports = class API {
  static init(baseRoute, app) {
    images.init(baseRoute, app);
    auth.init(baseRoute, app);
    tags.init(baseRoute, app);
    messages.init(baseRoute, app);
  }
};
