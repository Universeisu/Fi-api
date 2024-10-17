const Store = require("../models/store.model");

// Create and Save a New device
exports.create = async (req, res) => {
  const {
    storeId,
    storeName,
    address,
    latitude,
    longitude,
    deliveryRadius,
    adminId,
  } = req.body;

  if (
    !storeName ||
    !address ||
    !latitude ||
    !longitude ||
    !deliveryRadius ||
    !adminId
  ) {
    res.status(400).send({
      message:
        "Store Name, Address, Latitude, Longitude, and Delivery Radius cannot be empty!",
    });
    return; // Stop further execution
  }

  // Check if the Store already exists
  await Store.findOne({ where: { storeName: storeName } }).then((store) => {
    if (store) {
      return res.status(400).send({
        message: "Course already exists!",
      });
    }

    // Create a New Store
    const newStore = {
      storeId,
      storeName,
      address,
      latitude,
      longitude,
      deliveryRadius,
    };

    Store.create(newStore)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Something error occurred creating the  Store.",
        });
      });
  });
};

// Get all courses
exports.getAll = async (req, res) => {
  await Store.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Something error occurred retrieving  Store.",
      });
    });
};

// Get a Store by ID
exports.getById = async (req, res) => {
  const storeId = req.params.storeId;

  await Store.findByPk(storeId)
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "Not found  Store with id " + storeId });
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred retrieving the Store.",
      });
    });
};

// Update a course
exports.update = async (req, res) => {
  const storeId = req.params.storeId;

  await Store.update(req.body, {
    where: { storeId: storeId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " Store was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update  Device with id=" +
            storeId +
            ". Maybe  Device was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred updating the  Device.",
      });
    });
};

// Delete a  Device
exports.delete = async (req, res) => {
  const storeId = req.params.storeId;

  await Store.destroy({
    where: { storeId: storeId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " Device was deleted successfully.",
        });
      } else {
        res.send({
          message: "Cannot delete Device with id " + storeId + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred deleting the Device.",
      });
    });
};
