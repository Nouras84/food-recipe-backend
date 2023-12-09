const Recipe = require("../models/Recipe");

// Function to create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, preparationSteps, categories, images } =
      req.body;
    const author = req.user.userId; // Assuming req.user is set in authMiddleware

    const newRecipe = new Recipe({
      title,
      ingredients,
      preparationSteps,
      author,
      categories,
      images,
    });

    await newRecipe.save();

    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating recipe", error: error.message });
  }
};

// Function to get a specific recipe
exports.getRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ recipe });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recipe", error: error.message });
  }
};

// Function to update a recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const updateData = req.body;
    const userId = req.user.userId;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user is the author of the recipe
    if (recipe.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this recipe" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updateData, {
      new: true,
    });

    res.json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating recipe", error: error.message });
  }
};

// Function to delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user.userId;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user is the author of the recipe
    if (recipe.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this recipe" });
    }

    await Recipe.findByIdAndDelete(recipeId);

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting recipe", error: error.message });
  }
};
