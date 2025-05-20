import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User register
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exisitngUser = await User.findOne({ email });
    if (exisitngUser)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassowrd = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassowrd,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed!" });
  }
};
