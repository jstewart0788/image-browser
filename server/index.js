const path = require("path");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieEncrypter = require("cookie-encrypter");
const mongoose = require("mongoose");
require("dotenv").config();

const API = require("./routes/index");
const VerifyJwt = require("./middleware/verifyJwt");


mongoose.connect(
  `mongodb://${process.env.MONGO_USER_NAME}:${
    process.env.MONGO_PASSWORD
  }@ds237379.mlab.com:37379/heroku_q8z1vh85`,
  { useNewUrlParser: true }
);

const app = express();
const baseRoute = "/api/v1";

//Middleware
app
  .use(logger("dev"))
  .use(bodyParser.json({limit: '50mb'}))
  .use(bodyParser.urlencoded({limit: '50mb', extended: true}))
  .use(cookieParser(process.env.COOKIE_SECRET))
  .use(cookieEncrypter(process.env.COOKIE_SECRET));

// view engine setup
app.use(express.static("./build"));

//Security
app.use(VerifyJwt.init);

//Initialize API Routes
API.init(baseRoute, app);

//Serve Static Files
app.use("*", function(req, res, next) {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("404: Page Does Not Exist");
});

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || "3001";
app.listen(port, () => console.log(`Server running on ${port}!`));
