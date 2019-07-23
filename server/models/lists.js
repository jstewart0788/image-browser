const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: { type: String, required: true },
  createdBy: String,
  images: { type: [String], default: [] }
});

const model = mongoose.model("List", schema);

module.exports = model;
