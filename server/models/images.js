module.exports = class Image {
  constructor(mongoose) {
    this.schema = mongoose.Schema({
      name: { type: String, required: true },
      tags: { type: [String], index: true },
      customDesc: [String]
    });

    this.model = mongoose.model("Image", this.schema);
  }

  fetchAll(page, filter) {
    const queryFilter = filter ? { tags: filter } : null;
    return this.model
      .find(queryFilter, null, {
        sort: "-createdOn",
        limit: 20,
        skip: 20 * (page - 1)
      })
      .exec();
  }

  fetchOne(name) {
    return this.model.findOne({ name }).exec();
  }

  updateOne(image) {
    return this.model.updateOne({ _id: image['_id'] }, { tags: image.tags }).exec();
  }

  Count(filter) {
    const queryFilter = filter ? { tags: filter } : {};
    return this.model.count(queryFilter);
  }
};
