const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.DB_URI);
    console.log("Database is connected!");
  } catch (error) {
    console.error("Database isn't connected!", error);
  }
};

module.exports = connectDB;