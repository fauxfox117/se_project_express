require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { errors } = require("celebrate");

const routes = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// Middleware
app.use(
  cors({
    origin: [
      "https://sbolin.crabdance.com",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(requestLogger);

// Crash test route
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Routes
app.use("/", routes);

// Error logging
app.use(errorLogger);

// Celebrate error handling
app.use(errors());

// 404 handler
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Resource not found" });
});

// Centralized error handling
app.use(errorHandler);

app.listen(PORT, () => {});
