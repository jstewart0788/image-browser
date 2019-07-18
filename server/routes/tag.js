const Tag = require("../models/tag");
const dic = require("../init/dictionary");

module.exports = class Images {
  static init(baseRoute, app, mongoose) {
    const tag = new Tag(mongoose);

    app.post(`${baseRoute}/tag`, async (req, res, next) => {
      const tags = [];
      Object.keys(dic).map(code => {
        tags.push({ code, description: dic[code] });
      });
      tag.insertMany(tags, res, next);
    });
  }
};
