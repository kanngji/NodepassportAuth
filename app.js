const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

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

// Routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");

const PORT = process.env.PORT || 5000;

app.use("/", indexRouter);
app.use("/users", userRouter);

app.listen(PORT, console.log(`Server is running on ${PORT}`));
