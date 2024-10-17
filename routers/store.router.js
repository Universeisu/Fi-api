const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");
const authJwt = require("../middleware/authJwt");

// Create a device
// POST http://localhost:5000/api/v1/devices/
router.post("/", storeController.create);

// Get all device
// GET http://localhost:5000/api/v1/devices/
router.get("/", storeController.getAll);

// Get a device by ID
// GET http://localhost:5000/api/v1/devices/:id
router.get("/:id", storeController.getById);

// Update a device
// PUT http://localhost:5000/api/v1/devices/:id
router.put("/:id", storeController.update);

// Delete a device
// DELETE http://localhost:5000/api/v1/devices/:id
router.delete("/:id", storeController.delete);

module.exports = router;
