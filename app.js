const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(routes);

//
app.use(errorLogger);

// Routes
app.use("/", require("./routes/index"));

// Backup resources
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Resource not found" });
});

// Celebrate error handling
app.use(errors());

// Centralized error handling
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
