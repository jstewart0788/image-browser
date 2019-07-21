const mongoose = require("mongoose");

const schema = mongoose.Schema({
  code: {
    unique: true,
    type: String,
    required: [true, "No code inserted"],
    index: true
  },
  description: { type: String }
});

const model = mongoose.model("Tag", schema);
module.exports = model;
