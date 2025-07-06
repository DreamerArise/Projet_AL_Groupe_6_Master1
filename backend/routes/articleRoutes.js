const express = require("express");
const router = express.Router();
const ArticleController = require("../controllers/articleController");
const { authenticate, isEditor } = require("../middleware/authMiddleware");

// Public
router.get("/", ArticleController.getAllArticles);
router.get("/:id", ArticleController.getArticleById);
router.get("/categorie/:categoryId", ArticleController.getArticlesByCategory);

// Privé (éditeur ou admin)
router.post("/", authenticate, isEditor, ArticleController.createArticle);
router.put("/:id", authenticate, isEditor, ArticleController.updateArticle);
router.delete("/:id", authenticate, isEditor, ArticleController.deleteArticle);
router.get("/groupes-categories", ArticleController.getGroupedByCategory);

module.exports = router;
