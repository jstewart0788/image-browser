const jwt = require("jsonwebtoken");

const { encrypt, checkUser } = require("../utils/auth");
const Error = require("../models/error");
const User = require("../models/users");

module.exports = class Auth {
  static init(baseRoute, app, mongoose) {
    const user = new User(mongoose);

    app.post(`${baseRoute}/user/login`, async (req, res, next) => {
      const { userName, password } = req.body;
      await user
        .fetchOne(userName)
        .then(async ({ userName, email, password: storedPassword  }) => {
          const userObj = {
            userName,
            email
          };

          const isMatch = await checkUser(password, storedPassword);
          if (isMatch) {
            const token = jwt.sign({ user: userObj }, process.env.JWT_SECRET);
            res.cookie("session", token, {
              httpOnly: true,
              signed: true,
              sameSite: true,
              secure: process.env.NODE_ENV === "production", // no SSL/TLS on localhost
              maxAge: 43190000
            });
            res.json({ user: userObj });
          } else {
            throw new Error(401, { message: "Password is incorrect." });
          }
        })
        .catch(next);
    });

    app.get(`${baseRoute}/user`, async (req, res) => {
      res.json(req.user);
    });

    app.post(`${baseRoute}/user`, async (req, res, next) => {
      const { userName, password, email } = req.body;
      const hash = await encrypt(password);

      await user
        .InsertOne({ userName, email, password: hash })
        .then(result => {
          res.json({ id: result.id });
        })
        .catch(err => {
          switch (parseInt(err.code, 10)) {
            case 11000:
              res.status(409).send("Something went wrong");
              break;
            default:
              res.status(500).send("Something went wrong");
          }
        });
    });
  }
};
