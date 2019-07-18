const mongoose = require("mongoose");
const _ = require("lodash");
const Tag = require("../models/tag");

// const training = require("./Training-Concepts");
// const fileNames = require("./loadFiles");
const dic = require("./dictionary");
require("dotenv").config();
mongoose.connect(
  `mongodb://heroku_q8z1vh85:$27os2el3a3hsdeh4fspht35dug@ds237379.mlab.com:37379/heroku_q8z1vh85`,
  { useNewUrlParser: true }
);

// const imageSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   tags: { type: [String], index: true },
//   customDesc: [String],
//   createdAt: { type: Date, default: Date.now },
// });

// const Image = mongoose.model("Image", imageSchema);

const tags = [];
Object.keys(dic).map(code => {
  tags.push({ _id: code, code, description: dic[code] });
});
const tag = new Tag()
tag.insertMany(tags)

// for (let i = 0; i < imageNames.length; i++) {
//   let name = imageNames[i];
//   if (_.includes(fileNames, name)) images.push({ name, tags: training[name] });
// }

// if (fileNames.length === images.length) {
//   Image.create(images, (err, res) => {
//     if (err) console.log(err);
//     else console.log(res);
//   });
// } else {
//   console.log("no match!");
// }
