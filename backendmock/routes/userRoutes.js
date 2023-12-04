// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers);
router.get("/users/:email", userController.getUserByEmail);
router.post("/users", userController.createUser);
router.put("/users/:email", userController.updateUser);
router.delete("/users/:email", userController.deleteUser);

module.exports = router;
