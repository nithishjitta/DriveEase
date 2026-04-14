const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

async function connectDB() {
    // console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error", err));
}

module.exports = connectDB;