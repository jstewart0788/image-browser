const Image = require("../models/images");

module.exports = class Images {
  static init(baseRoute, app, mongoose) {
    const image = new Image(mongoose);

    app.get(`${baseRoute}/image`, async (req, res, next) => {
      const { name, page = 1 } = req.query;
      console.log(req.query);
      if (name) {
        image
          .fetchOne(name)
          .then(image => {
            res.json(image);
          })
          .catch(next);
      } else if (page) {
        image
          .fetchAll(page)
          .then(images => {
            res.json(images);
          })
          .catch(next);
      }
    });
  }
};
