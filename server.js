var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("express-flash");

var connectDB = require("./utils/db");
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var medsRouter = require("./routes/meds");
var tipsRouter = require("./routes/tips");
var passport = require("./utils/passportConfig");

// initialize app
var app = express();
// connect database
connectDB();

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//initialize passport js
app.use(
  session({
    secret: "nadia and cats",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// serve static files
app.use(express.static("public"));

// middleware setuo
app.use(logger("dev"));
app.use(express.json());

//enable flash message in view
app.use(flash());

//middleware to serve user info on every route
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// route setup
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/meds", medsRouter);
app.use("/tips", tipsRouter);

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log("server running at : " + port));
