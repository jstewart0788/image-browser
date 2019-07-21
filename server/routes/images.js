const Image = require("../services/images");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

module.exports = class Images {
  static init(baseRoute, app) {
    const image = new Image();
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

    app.put(`${baseRoute}/image`, async (req, res, next) => {
      const doc = req.body.image;
      image
        .updateOne(doc)
        .then(() => {
          res.json(doc);
        })
        .catch(next);
    });

    app.post(`${baseRoute}/image`, upload.any(), async (req, res) => {
      image.uploadMany(req, res);
    });
  }
};
