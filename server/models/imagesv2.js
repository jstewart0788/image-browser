const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  img: { data: Buffer, contentType: String },
  description: String,
  codes: [String],
  postedBy: String
});

schema.virtual("tags", {
  ref: "Tag",
  localField: "codes",
  foreignField: "code",
  justOne: false // for many-to-1 relationships
});

schema.virtual("user", {
  ref: "User",
  localField: "postedBy",
  foreignField: "userName",
  justOne: true // for many-to-1 relationships
});

const model = mongoose.model("Imagev2", schema);

module.exports = model;
