const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();
const User = require("./models/userSchema");
const jwt = require("jsonwebtoken");

const db =
  "mongodb+srv://ahmad:ahmad@cluster0.rfpnfwi.mongodb.net/MessageApp?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then(async () => {
    console.log("Connected!".bgGreen);
  })
  .catch(() => console.log("Connection Error!".bgRed));
