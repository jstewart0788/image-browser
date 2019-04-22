const Image = require("../models/images");

module.exports = class Images {
  static init(baseRoute, app, mongoose) {
    const image = new Image(mongoose);

    app.get(`${baseRoute}/image`, async (req, res, next) => {
      const { name, page, count, filter } = req.query;
      if (name) {
        image
          .fetchOne(name)
          .then(image => {
            res.json(image);
          })
          .catch(next);
      } else if (page) {
        image
          .fetchAll(page, filter)
          .then(images => {
            res.json(images);
          })
          .catch(next);
      } else if (count) {
        image
          .Count(filter)
          .then(number => {
            res.json({ count: number });
          })
          .catch(next);
      } else {
        res.status(404).send("No Valid Query Paramaters!");
      }
    });
  }
};
