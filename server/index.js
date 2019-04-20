const path = require("path");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const API = require("./routes/index");

mongoose.connect(
  `mongodb://${process.env.MONGO_USER_NAME}:${
    process.env.MONGO_PASSWORD
  }@ds237379.mlab.com:37379/heroku_q8z1vh85`,
  { useNewUrlParser: true }
);

const app = express();
const baseRoute = "/api/v1";

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.use(express.static("./build"));

//Initialize API Routes
API.init(baseRoute, app, mongoose);

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
