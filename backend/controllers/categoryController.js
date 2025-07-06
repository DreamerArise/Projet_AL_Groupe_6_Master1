const Category = require("../models/categoryModel");

const CategoryController = {
  getAll: (req, res) => {
    Category.getAll((err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(data);
    });
  },

  getById: (req, res) => {
    Category.getById(req.params.id, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!data.length)
        return res.status(404).json({ error: "Catégorie non trouvée" });
      res.json(data[0]);
    });
  },

  create: (req, res) => {
    const { libelle } = req.body;
    if (!libelle) return res.status(400).json({ error: "libelle requis" });

    Category.create(libelle, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Catégorie créée" });
    });
  },

  update: (req, res) => {
    const { libelle } = req.body;
    Category.update(req.params.id, libelle, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Catégorie mise à jour" });
    });
  },

  delete: (req, res) => {
    Category.delete(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Catégorie supprimée" });
    });
  },
};

module.exports = CategoryController;
