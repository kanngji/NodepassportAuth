const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express");

const app = express();

// DB Config
const db = require("./config/keys").MongoURI;

// Connet to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Connet flash
app.use(flash());

// Global Var
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");

const PORT = process.env.PORT || 5000;

app.use("/", indexRouter);
app.use("/users", userRouter);

app.listen(PORT, console.log(`Server is running on ${PORT}`));
