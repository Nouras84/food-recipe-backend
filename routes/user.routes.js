const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// User registration
router.post("/register", userController.register);

// User login
router.post("/login", userController.login);

// Get user profile
router.get("/profile/:userId", userController.getUserProfile);

// Update user profile
router.put("/prsofile/:userId", userController.updateUserProfile);

// Follow another user
router.post("/follow/:userId", userController.followUser);

// Unfollow a user
router.post("/unfollow/:userId", userController.unfollowUser);

module.exports = router;
