const Tag = require("../models/tag");

module.exports = class TagServcie {
  fetchAll() {
    return Tag.find({}).exec();
  }

  async getIdsByCode(name) {
    return await Tag.findOne({ name }).exec();
  }

  insertMany(tags, res) {
    Tag.insertMany(tags, err => {
      if (err) res.status(500).json({ msg: "Failed to create tags" });
      else res.json({ msg: "Succesfully created tags" });
    });
  }
};
