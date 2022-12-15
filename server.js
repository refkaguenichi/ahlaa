
const express = require("express");
const connectDB = require("./config/connectDB");

//instance of all express methods
const app = express();
//-------------------------------------
require("dotenv").config();
//connect with database
connectDB();
//Global middlware to read json type
app.use(express.json());

//acces to routes
app.use("/api/users", require("./router/user"));

//port
PORT = process.env.PORT || 6000;

//start the server
app.listen(PORT, () => {
  console.log("server is running on port", PORT, "!");
});