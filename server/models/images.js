module.exports = class Image {
  constructor(mongoose) {
    this.schema = mongoose.Schema({
      name: { type: String, required: true },
      tags: { type: [String], index: true },
      customDesc: [String]
    });

    this.model = mongoose.model("Image", this.schema);
  }

  fetchAll(page) {
    return this.model
      .find(null, null, {sort:"-createdOn", limit: 20,  skip: 20 * (page - 1) })
      .exec();
  }

  fetchOne(name) {
    return this.model.findOne({ name }).exec();
  }
};
