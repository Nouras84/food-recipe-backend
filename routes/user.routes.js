const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

// User registration
router.post("/register", userController.register);

// User login
router.post("/login", userController.login);

router.get("/profile/:userId", authMiddleware, userController.getUserProfile);
router.put(
  "/profile/:userId",
  authMiddleware,
  userController.updateUserProfile
);
router.post("/follow/:userId", authMiddleware, userController.followUser);
router.post("/unfollow/:userId", authMiddleware, userController.unfollowUser);

// Apply the middleware to routes that require authentication

module.exports = router;
