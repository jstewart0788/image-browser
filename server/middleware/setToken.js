module.exports = class TokenHandler {
  static init(req, res, next) {
    if (
      !req.path.startsWith("/api/v1") ||
      req.path === "/api/v1/user" ||
      req.path === "/api/v1/user/login"
    ) {
      next();
    } else if (req.auth) {
      req.token = req.auth;
      next();
    } else {
      res.status(401).send("Not Authorized. No token found.");
    }
  }
};
