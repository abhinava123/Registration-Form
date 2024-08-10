// routes/userRoutes.js
const express = require("express");
const { registerUser } = require("../controllers/userController");

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

module.exports = router;
