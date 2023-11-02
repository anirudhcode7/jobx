const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
register = async (req, res) => {
    try {
      // Retrieve user data from the request body
      const { username, password } = req.body;

      // Check if the username or password is missing
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
      }

      // Check if the username already exists in the database
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already in use.' });
      }

      // Create a new user document and set the virtual 'password' field
      const newUser = new User({ username, password });

      // Save the user document to the database
      await newUser.save();
      console.log("New User Saved")

      res.status(201).json({ message: 'Registration successful.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
};


// Log in an existing user
login = async (req, res) => {
    try {
      // Retrieve user data from the request body
      const { username, password } = req.body;

      // Check if the username or password is missing
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
      }

      // Find the user in the database by their username
      const user = await User.findOne({ username });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Verify the user's password using the virtual 'password' field
      if (user.authenticate(password)) {
        // Password is correct, generate a JWT token
        const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
        console.log("Authenticated new user")
        // Send the token in the response
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid password.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Login failed. Please try again.' });
    }
  };

const AuthController = {
    register,
    login
}

module.exports = AuthController;