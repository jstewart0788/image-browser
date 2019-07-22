const Tag = require("../models/tag");

module.exports = class TagServcie {
  fetchAll() {
    return Tag.find({}).exec();
  }

  insertOne(req, res) {
    const { code, desc } = req.body;
    Tag.create({ code, description: desc }, (err, data) => {
      if (err) res.status(500).json({ msg: "Failed to create message" });
      else res.json(data);
    });
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
