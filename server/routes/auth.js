import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = "MY_SECRET_TOKEN";

// ------------------ SIGNUP ---------------------
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    user = await User.create({
      username,
      email,
      password: hashed,
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------ LOGIN ---------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------ ME ---------------------
router.get("/me", async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header)
      return res.status(401).json({ message: "No token" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;

