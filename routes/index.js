const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");
const auth = require("../middlewares/auth");
const { getClothingItems } = require("../controllers/clothingItems");

// Public routes (no auth required)
router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getClothingItems);

// Protect all other routes with auth middleware
router.use(auth);

// Protected routes (auth required)
router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

// Handle 404 errors
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Resource not found" });
});

module.exports = router;
