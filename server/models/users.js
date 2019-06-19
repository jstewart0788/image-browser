module.exports = class Users {
  constructor(mongoose) {
    this.schema = mongoose.Schema({
      userName: { type: String, required: true, unique : true },
      email: { type: String, required: true, unique : true },
      password: { type: String, required: true },
    });

    this.model = mongoose.model("User", this.schema);
  }

  fetchOne(userName) {
    return this.model.findOne({ userName }).exec();
  }

  InsertOne(user){
    return this.model.create(user);
  }
};
