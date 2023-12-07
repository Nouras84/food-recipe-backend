const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

// Route to add a new category
router.post("/", categoryController.addCategory);

// Route to update a category
router.put("/:categoryId", categoryController.updateCategory);

// Route to delete a category
router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;
