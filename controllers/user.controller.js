const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to handle user registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists " });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Error handling
    res.status(500).json({ message: "Error registering user" });
  }
};

// Function to handle user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    // Error handling
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Function to get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password"); // Exclude password from the result

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ profile: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User profile updated", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user profile", error: error.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const { userId } = req.user; // User who is performing the action
    const targetUserId = req.params.userId; // User to be followed
    // Check if target user exists
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    // Add targetUserId to the following array of userId
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { following: targetUserId } }, // $addToSet prevents duplicates
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optionally, add userId to the followers array of targetUserId
    await User.findByIdAndUpdate(
      targetUserId,
      { $addToSet: { followers: userId } },
      { new: true }
    );

    res.json({ message: "User followed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error following user", error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const userId = req.userData.userId; // User who is performing the action
    const targetUserId = req.params.userId; // User to be unfollowed

    // Check if target user exists
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    // Remove targetUserId from the following array of userId
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { following: targetUserId } }, // $pull removes the targetUserId from the array
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optionally, remove userId from the followers array of targetUserId
    await User.findByIdAndUpdate(
      targetUserId,
      { $pull: { followers: userId } },
      { new: true }
    );

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error unfollowing user", error: error.message });
  }
};
