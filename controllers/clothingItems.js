const ClothingItem = require("../models/clothingitem");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.send(clothingItems))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "An error occurred on the server" });
    });
};

const createClothingItem = (req, res) => {
  
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Invalid data" });
      }
      res.status(500).send({ message: "An error occurred on the server" });
    });
};
const deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }
      res.status(500).send({ message: "An error occurred on the server" });
    });
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem };
