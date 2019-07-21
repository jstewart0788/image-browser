const Tag = require("../models/tag");

module.exports = class TagServcie {
  fetchAll(page, filter) {
    const queryFilter = filter ? { tags: filter } : null;
    return Tag.find(queryFilter, null, {
      sort: "-createdOn",
      limit: 20,
      skip: 20 * (page - 1)
    }).exec();
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
