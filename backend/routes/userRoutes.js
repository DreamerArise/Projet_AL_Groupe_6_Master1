const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// Lister tous les utilisateurs (admin uniquement)
router.get('/', authenticate, isAdmin, (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json(results);
  });
});

// Supprimer un utilisateur (admin uniquement)
router.delete('/:id', authenticate, isAdmin, (req, res) => {
  User.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json({ message: 'Utilisateur supprimé' });
  });
});

module.exports = router;