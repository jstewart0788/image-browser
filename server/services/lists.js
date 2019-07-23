const List = require("../models/lists");

module.exports = class ListServcie {
  fetchAllUsersLists(user) {
    return List.find({ createdBy: user }).exec();
  }

  addImageToList(name, images) {
    return List.updateOne({ name }, { images }).exec();
  }

  createOne(req, res) {
    const { name } = req.body;
    List.create({ name, createdBy: req.user.userName }, (err, data) => {
      if (err) res.status(500).json({ msg: "Failed to create list" });
      else res.json(data);
    });
  }
};
