const mongoose = require("mongoose");
const training = require("./Training-Concepts");
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
  customDesc: [String]
});

const Image = mongoose.model("Image", imageSchema);

const images = [];
const imageNames = Object.keys(training);

for (let i = 0; i < imageNames.length; i++) {
  let name = imageNames[i];
  images.push({ name, tags: training[name] });
}

Image.create(images, (err, res) => {
  if (err) console.log(err);
  else console.log(res);
});
