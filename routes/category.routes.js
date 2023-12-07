const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Route to add a new category
router.post("/", authMiddleware, categoryController.addCategory);
router.put("/:categoryId", authMiddleware, categoryController.updateCategory);
// router.delete(
//   "/:categoryId",
//   authMiddleware,
//   categoryController.deleteCategory
// );

module.exports = router;
