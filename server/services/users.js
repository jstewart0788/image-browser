const User = require("../models/users");

module.exports = class UsersService {
  fetchOne(userName) {
    return User.findOne({ userName }).exec();
  }

  InsertOne(user) {
    return User.create(user);
  }
};
