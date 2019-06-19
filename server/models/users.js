module.exports = class Users {
  constructor(mongoose) {
    this.schema = mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    });

    this.model = mongoose.model("User", this.schema);
  }

  fetchOne({name}) {
    return this.model.findOne({ name }).exec();
  }

  InsertOne(user){
    return this.model.create(user);
  }
};
