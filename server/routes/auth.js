const jwt = require("jsonwebtoken");

const { encrypt, checkUser } = require("../utils/auth");
const User = require("../models/users");

module.exports = class Auth {
  static init(baseRoute, app, mongoose) {
    const user = new User(mongoose);

    app.post(`${baseRoute}/user/login`, async (req, res) => {
      const { userName, password } = req.body;
      await user
        .fetchOne(userName)
        .then(async user => {
          const { userName, email, password: storedPassword } = user || {};
          if (userName) {
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
              res.status(401).send("Password is incorrect.");
            }
          } else {
            res.status(404).send("No user matching that username exists.");
          }
        })
        .catch(err => console.log(err));
    });

    app.get(`${baseRoute}/user`, async (req, res) => {
      res.json(req.user);
    });

    app.post(`${baseRoute}/user`, async (req, res) => {
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
              res.status(409).send("Field already exists");
              break;
            default:
              res.status(500).send("Something went wrong");
          }
        });
    });
  }
};
