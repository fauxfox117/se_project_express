const express = require("express");

const mongoose = require("mongoose");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("./utils/errors");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// Connection event listeners
mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Disconnected from MongoDB");
});

// Middleware
app.use(express.json());

// Temporary auth middleware (add a test user ID later)
app.use((req, res, next) => {
  req.user = {
    _id: "691b7d8c1430510d2a8dc2fc", // You'll replace this with a real user ID after creating one
  };
  next();
});

// Routes
app.use("/users", require("./routes/users"));
app.use("/items", require("./routes/clothingItems"));

// Backup resources
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
