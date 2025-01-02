require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var lessonsRouter = require("./routes/lessons");
var favoritesRouter = require("./routes/favorites");
var dicoRouter = require("./routes/dictionnary");
var wordRouter = require("./routes/word");

var app = express();

const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/lessons", lessonsRouter);
app.use("/favorites", favoritesRouter);
app.use("/dictionnary", dicoRouter);
app.use("/word", wordRouter);
module.exports = app;
