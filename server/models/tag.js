module.exports = class Tag {
    constructor(mongoose) {
      this.schema = mongoose.Schema({
        code: { type: String, required: [true, 'No code inserted'] },
        description: { type: String, index: true },
        count: { type: Number, required: true, default: 0 }
      });
  
      this.model = mongoose.model("Tag", this.schema);
    }
  
    // fetchAll(page, filter) {
    //   const queryFilter = filter ? { tags: filter } : null;
    //   return this.model
    //     .find(queryFilter, null, {
    //       sort: "-createdOn",
    //       limit: 20,
    //       skip: 20 * (page - 1)
    //     })
    //     .exec();
    // }
  
    // fetchOne(name) {
    //   return this.model.findOne({ name }).exec();
    // }
  
    // updateOne(image) {
    //   return this.model.updateOne({ _id: image['_id'] }, { tags: image.tags }).exec();
    // }
  };
  