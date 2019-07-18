module.exports = class Tag {
  
  constructor(mongoose) {
    this.schema = mongoose.Schema({
      code: {
        unique: true,
        type: String,
        required: [true, "No code inserted"],
        index: true
      },
      description: { type: String }
    });

    this.model = mongoose.model("Tag", this.schema);
  }

  fetchOne(code) {
    return this.model.findOne({ code }).exec();
  }

  insertMany(tags, res) {
    this.model.insertMany(tags, err => {
      if (err) res.status(500).json({ msg: "Failed to create tags" });
      else res.json({ msg: "Succesfully created tags" });
    });
  }
};
