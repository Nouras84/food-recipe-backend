const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");

// Route to create a new recipe
router.post("/", recipeController.createRecipe);

// Route to get a specific recipe
router.get("/:recipeId", recipeController.getRecipe);

// Route to update a recipe
router.put("/:recipeId", recipeController.updateRecipe);

// Route to delete a recipe
router.delete("/:recipeId", recipeController.deleteRecipe);

module.exports = router;
