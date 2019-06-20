const jwt = require("jsonwebtoken");
const Error = require("../models/error");

module.exports = class VerifyJwt {
  static init(req, res, next) {
    const authToken =
      req.signedCookies && req.signedCookies.session
        ? req.signedCookies.session
        : null;
    if (
      !req.path.startsWith("/api") ||
      (req.path === "/api/v1/user" && req.method === "POST") ||
      req.path === "/api/v1/user/login"
    ) {
      next();
    } else if (authToken) {
      try {
        const { userName, email } = jwt.verify(
          authToken,
          process.env.JWT_SECRET
        );
        req.user = {
          userName,
          email
        };
      } catch (err) {
        throw new Error(401, { message: "Not authorized." });
      }
      next();
    } else {
      throw new Error(401, { message: "No token found." });
    }
  }
};
