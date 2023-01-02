
const express = require("express");
const connectDB = require("./config/connectDB");
var cors = require("cors");

//instance of all express methods
const app = express();
app.use(cors());
//-------------------------------------
require("dotenv").config();
//connect with database
connectDB();
//Global middlware to read json type
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
  next(); // Important
});

//acces to routes
app.use("/api/users", require("./router/user"));

//port
PORT = process.env.PORT || 4202;

//start the server
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});