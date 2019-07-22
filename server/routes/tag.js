const Tag = require("../services/tag");
const dic = require("../init/dictionary");

module.exports = class Images {
  static init(baseRoute, app) {
    const tag = new Tag();

    app.get(`${baseRoute}/tag`, async (req, res, next) => {
      tag
        .fetchAll()
        .then(tags => {
          res.json(tags);
        })
        .catch(next);
    });

    app.post(`${baseRoute}/tag`, async (req, res, next) => {
      // const tags = [];
      // Object.keys(dic).map(code => {
      //   tags.push({ code, description: dic[code] });
      // });
      // tag.insertMany(tags, res, next);
      tag.insertOne(req, res);
    });
  }
};
