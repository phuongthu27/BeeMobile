const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");

const app = express();

// Kết nối đến MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.URL_FE
}));

// Khởi động server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
