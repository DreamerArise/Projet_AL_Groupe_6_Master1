const db = require("../config/db");

const Article = {
  getAll: (callback) => {
    db.query("SELECT * FROM articles ORDER BY created_at DESC", callback);
  },

  getById: (id, callback) => {
    db.query(
      `SELECT a.*, u.name AS author
      FROM articles a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.id = ?`,
      [id],
      callback
    );
  },

  getByCategory: (categoryId, callback) => {
    db.query(
      "SELECT * FROM articles WHERE category_id = ?",
      [categoryId],
      callback
    );
  },

  create: (article, callback) => {
    const { title, description, content, category_id } = article;
    db.query(
      "INSERT INTO articles (title, description, content, category_id) VALUES (?, ?, ?, ?)",
      [title, description, content, category_id],
      callback
    );
  },

  update: (id, article, callback) => {
    const { title, description, content, category_id } = article;
    db.query(
      "UPDATE articles SET title = ?, description = ?, content = ?, category_id = ? WHERE id = ?",
      [title, description, content, category_id, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM articles WHERE id = ?", [id], callback);
  },
};

module.exports = Article;
