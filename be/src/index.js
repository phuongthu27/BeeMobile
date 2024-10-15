const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");
const savingsGoalRouter = require("./routes/SavingsGoalRouter");
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transaction");

const app = express();

connectDB();

app.use(express.json());
app.use(cors({
  origin: process.env.URL_FE
}));

app.use('/api', savingsGoalRouter);
app.use("/api/auth", authRoutes);
app.use("/api/v2/categories", require('./routes/category'));
app.use("/api/transactions", transactionRoutes);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
