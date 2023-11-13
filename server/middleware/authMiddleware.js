const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token missing.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key

    // Attach the user object to the request for further use if needed
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid
    return res.status(401).json({ message: 'Unauthorized - Invalid token.' });
  }
};

module.exports = authMiddleware;
