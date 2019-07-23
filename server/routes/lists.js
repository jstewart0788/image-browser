const List = require("../services/lists");

module.exports = class Images {
  static init(baseRoute, app) {
    const list = new List();

    app.get(`${baseRoute}/list`, async (req, res) => {
      const { userName } = req.user;
      list
        .fetchAllUsersLists(userName)
        .then(tags => {
          res.json(tags);
        })
        .catch(() => {
          res.status(500).json({ msg: "Failed to retrive lists" });
        });
    });

    app.post(`${baseRoute}/list`, async (req, res) => {
      list.createOne(req, res);
    });
  }
};
