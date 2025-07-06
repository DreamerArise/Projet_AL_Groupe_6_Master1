const Token = require("../models/tokenModel");
const crypto = require("crypto");

const TokenController = {
  create: (req, res) => {
    const userId = req.user.id; // depuis le middleware JWT
    const token = crypto.randomBytes(32).toString("hex");

    Token.create(token, userId, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ token, message: "Jeton généré avec succès" });
    });
  },

  getAll: (req, res) => {
    Token.getAll((err, tokens) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(tokens);
    });
  },

  delete: (req, res) => {
    const tokenId = req.params.id;
    Token.delete(tokenId, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Jeton supprimé avec succès" });
    });
  },
};

module.exports = TokenController;
