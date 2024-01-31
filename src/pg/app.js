var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const fs = require("fs");
const querystring = require("querystring");

var indexRouter = require("./routes/index");
const { default: got } = require("got");
const { default: axios } = require("axios");
const opn = require("opn");

var app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "https://dinnermate-node-server-0d7d5dc74685.herokuapp.com/",
      "https://dinnermate.kr",
      "http://localhost:3002", // pg
      "http://localhost:3001", // kcp
      "http://localhost:3000", // front
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

module.exports = app;
