module.exports = class Message {
  constructor(mongoose) {
    this.schema = mongoose.Schema({
      content: { type: String, required: true },
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image" }
    });

    this.model = mongoose.model("Message", this.schema);
  }

//   fetchAll(page, filter) {
//     const queryFilter = filter ? { tags: filter } : null;
//     return this.model
//       .find(queryFilter, null, {
//         sort: "-createdOn",
//         limit: 20,
//         skip: 20 * (page - 1)
//       })
//       .exec();
//   }

//   fetchOne(name) {
//     return this.model.findOne({ name }).exec();
//   }

//   updateOne(image) {
//     return this.model
//       .updateOne({ _id: image["_id"] }, { tags: image.tags })
//       .exec();
//   }
};
