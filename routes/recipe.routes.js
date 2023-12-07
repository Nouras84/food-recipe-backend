const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Route to create a new recipe
router.post("/", authMiddleware, recipeController.createRecipe);

// Route to get a specific recipe
router.get("/:recipeId", recipeController.getRecipe);

// Route to update a recipe
router.put("/:recipeId", authMiddleware, recipeController.updateRecipe);
router.delete("/:recipeId", authMiddleware, recipeController.deleteRecipe);

module.exports = router;
