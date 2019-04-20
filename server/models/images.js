const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tags: { type: [String], index: true },
    customDesc: [String]
  });

  var Image = mongoose.model('Image', imageSchema);

  module.exports  = Image;