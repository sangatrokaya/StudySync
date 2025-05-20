import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect private routes
const protect = async (req, res, next) => {
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

    // Fetch user from DB and exclude password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    // Attach user ID to request object for later use in controllers
    req.user = user;

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired Token!" });
  }
};

export default protect;
