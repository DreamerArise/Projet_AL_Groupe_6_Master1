const express = require("express");
const router = express.Router();
const TokenController = require("../controllers/tokenController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

// CRUD des tokens réservé aux admins
router.post("/", authenticate, isAdmin, TokenController.create);
router.get("/", authenticate, isAdmin, TokenController.getAll);
router.delete("/:id", authenticate, isAdmin, TokenController.delete);

module.exports = router;
