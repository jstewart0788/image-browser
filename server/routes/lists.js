const List = require("../services/lists");

module.exports = class Images {
  static init(baseRoute, app) {
    const list = new List();

    app.get(`${baseRoute}/list`, async (req, res) => {
      const { userName } = req.user;
      list
        .fetchAllUsersLists(userName)
        .then(lists => {
          res.json(lists);
        })
        .catch(() => {
          res.status(500).json({ msg: "Failed to retrive lists" });
        });
    });

    app.post(`${baseRoute}/list`, async (req, res) => {
      list.createOne(req, res);
    });

    app.put(`${baseRoute}/list`, async (req, res) => {
      const { name, images } = req.body;
      list
        .addImageToList(name, images)
        .then(lists => {
          res.json({ msg: "Succesfully added image to lists" });
        })
        .catch(() => {
          res.status(500).json({ msg: "Failed to add image to lists" });
        });
    });
  }
};
