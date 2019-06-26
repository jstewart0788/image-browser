module.exports = class List {
    constructor(mongoose) {
      this.schema = mongoose.Schema({
        name: { type: String, required: true },
        description: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }]
      });
  
      this.model = mongoose.model("List", this.schema);
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
  