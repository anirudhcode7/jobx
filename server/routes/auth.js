const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Register a new user
router.post('/register', AuthController.register);

// Log in an existing user
router.post('/login', AuthController.login);

// Other authentication-related routes can be added here

module.exports = router;
