const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");
const { authenticate, isEditor } = require("../middleware/authMiddleware");

// Public
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);

// Privé : admin ou éditeur
router.post("/", authenticate, isEditor, CategoryController.create);
router.put("/:id", authenticate, isEditor, CategoryController.update);
router.delete("/:id", authenticate, isEditor, CategoryController.delete);

module.exports = router;
