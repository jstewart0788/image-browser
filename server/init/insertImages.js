const mongoose = require("mongoose");
const _ = require("lodash");

const training = require("./Training-Concepts");
const fileNames = require("./loadFiles");

require("dotenv").config();

mongoose.connect(
  `mongodb://${process.env.MONGO_USER_NAME}:${
    process.env.MONGO_PASSWORD
  }@ds237379.mlab.com:37379/heroku_q8z1vh85`,
  { useNewUrlParser: true }
);

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: { type: [String], index: true },
  customDesc: [String],
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", imageSchema);

const images = [];
const imageNames = Object.keys(training);

for (let i = 0; i < imageNames.length; i++) {
  let name = imageNames[i];
  if (_.includes(fileNames, name)) images.push({ name, tags: training[name] });
}

if (fileNames.length === images.length) {
  Image.create(images, (err, res) => {
    if (err) console.log(err);
    else console.log(res);
  });
}
else{
  console.log("no match!");
}
