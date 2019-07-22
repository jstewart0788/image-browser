const mongoose = require("mongoose");
const schema = mongoose.Schema({
  content: { type: String, required: true },
  postedBy: String,
  imageId: String
},{timestamps:true});

const model = mongoose.model("Message", schema);


module.exports = model;
