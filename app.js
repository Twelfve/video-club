var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const { expressjwt } = require("express-jwt");
const config = require('config');
const i18n = require("i18n");

const jwtKey = config.get("secret.key");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var directorsRouter = require("./routes/directors");
var moviesRouter = require("./routes/movies");
var membersRouter = require("./routes/members");

var app = express();

const url = "mongodb://localhost:27017/video-club";
mongoose.connect(url);
const db = mongoose.connection;

db.on("open", () => {
  console.log("Conexión a la base de datos establecida");
  
});
db.on("error", () => {
  console.log("Error de conexión a la base de datos");
});

i18n.configure({
  locales: ["es", "en"],
  cookie: "lang",
  directory: path.join(__dirname, "locales"),
  defaultLocale: "es",
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressjwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({
    path: ["/login"],
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/directors", directorsRouter);
app.use("/movies", moviesRouter);
app.use("/members", membersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;