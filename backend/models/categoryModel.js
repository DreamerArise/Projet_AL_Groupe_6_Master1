const db = require("../config/db");

const Category = {
  getAll: (callback) => {
    db.query("SELECT * FROM categories", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM categories WHERE id = ?", [id], callback);
  },

  create: (libelle, callback) => {
    db.query(
      "INSERT INTO categories (libelle) VALUES (?)",
      [libelle],
      callback
    );
  },

  update: (id, libelle, callback) => {
    db.query(
      "UPDATE categories SET libelle = ? WHERE id = ?",
      [libelle, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM categories WHERE id = ?", [id], callback);
  },
};

module.exports = Category;
