const express = require("express");

const mongoose = require("mongoose");
const { NOT_FOUND } = require("./utils/errors");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

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

app.listen(PORT);
