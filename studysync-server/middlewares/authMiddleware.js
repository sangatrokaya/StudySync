import jwt from "jsonwebtoken";

// Middleware to protect private routes
const protect = (req, res, next) => {
  try {
    // Check if Authorization header is present and starts with "Bearer"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided!" });
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object for later use in controllers
    req.userId = decoded.id;

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired Token!" });
  }
};

export default protect;
