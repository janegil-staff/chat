import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import cloudinary from "../configs/cloudinary.config.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, status, image } = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // Check for existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords doees not match" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Upload image if provided
    let picture;
    if (image) {
      // base64 format
      if (image.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "chat",
          });
          picture = uploadResponse.secure_url;
        } catch (error) {
          console.error("Error uploading image:", error);

          return res.status(400).json({
            success: false,
            message: "Error uploading image",
          });
        }
      }
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: picture || process.env.DEFAULT_PICTURE,
      status: process.env.DEFAULT_STATUS || "Available",
    });

    // Generate token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
