const mongoose = require("mongoose");

const schema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: [true, "Username in use."]
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Emaill already assosiated to an account."]
  },
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

const model = mongoose.model("User", schema);

module.exports = model;
