const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");
const auth = require("../middlewares/auth");

//Public Routes (no auth required)
router.post("/signup", createUser);
router.post("/signin", login);

//GET items is public
router.use("/items", clothingItemsRouter);

//Protect all other routes with auth middleware
router.use(auth);

//Protected routes (auth required)
router.use("/users", userRouter);
router.post(
  "/items",
  require("../controllers/clothingItems").createClothingItem
);
router.delete(
  "/items/:itemId",
  require("../controllers/clothingItems").deleteClothingItem
);
router.put(
  "/items/:itemId/likes",
  require("../controllers/clothingItems").likeItem
);
router.delete(
  "/items/:itemId/likes",
  require("../controllers/clothingItems").dislikeItem
);

//Handle 404 errors

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Resource not found" });
});

module.exports = router;
