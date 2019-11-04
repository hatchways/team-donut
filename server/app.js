import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

// import indexRouter from "./routes/index";
// import pingRouter from "./routes/ping";
const indexRouter = require("./routes/index")
const pingRouter = require("./routes/ping")

const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/babyregistry", { useUnifiedTopology: true }, err => 
  err ? console.log('Error: ', err) : console.log('MongoDB is connected!'));

require('dotenv').config();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
