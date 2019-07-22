const List = require("../services/lists");

module.exports = class Images {
  static init(baseRoute, app) {
    const list = new List();

    app.get(`${baseRoute}/list`, async (req, res, next) => {
        list
        .fetchAll()
        .then(tags => {
          res.json(tags);
        })
        .catch(next);
    });

  }
};
