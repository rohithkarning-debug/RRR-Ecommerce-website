import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connect
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
