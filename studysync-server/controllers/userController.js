import User from "../models/User.js";

// @desc Get logged-in user's profile
// @route GET /api/users
// @access Private
export const getProfile = async (req, res) => {
  try {
    // Fetch user by Id set by authMiddleware
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    // Send user profile without password
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    console.error("Failed to fetch user profile!", error.message);
    res.status.json({ message: "Server error while fetching profile!" });
  }
};
