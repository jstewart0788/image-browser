module.exports = class Users {
  constructor(mongoose) {
    this.schema = mongoose.Schema({
      userName: { type: String, required: true, unique: [true, 'Username in use.'] },
      email: { type: String, required: true, unique: [true, 'Emaill already assosiated to an account.'] },
      password: { type: String, required: true },
      roles: [
        {
          type: String,
          enum: ["user", "admin"],
          required: true,
          default: "user"
        }
      ]
    });

    this.model = mongoose.model("User", this.schema);
  }

  fetchOne(userName) {
    return this.model.findOne({ userName }).exec();
  }

  InsertOne(user) {
    return this.model.create(user);
  }
};
