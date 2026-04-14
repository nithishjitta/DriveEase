require("dotenv").config(); 
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const router = require('./routes/route');
const connectDB = require('./connection/connect.js');
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/', router);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port 3000');
})