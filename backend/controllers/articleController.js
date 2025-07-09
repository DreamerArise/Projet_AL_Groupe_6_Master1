const Article = require("../models/articleModel");
const db = require("../config/db");
const xml2js = require("xml2js");

const ArticleController = {
  getAllArticles: (req, res) => {
    const { page = 1, limit = 5, search = "", category_id } = req.query;
    const offset = (page - 1) * limit;
    const accept = req.headers["accept"];

    let sql = `SELECT * FROM articles WHERE 1=1`;
    const params = [];

    //Filtre par mot-clé
    if (search) {
      sql += ` AND title LIKE ?`;
      params.push(`%${search}%`);
    }

    //Filtre par catégorie
    if (category_id) {
      sql += ` AND category_id = ?`;
      params.push(category_id);
    }

    // 📑 Pagination
    sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    db.query(sql, params, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });

      if (accept === "application/xml") {
        const builder = new xml2js.Builder();
        const xml = builder.buildObject({ articles: data });
        res.set("Content-Type", "application/xml");
        res.send(xml);
      } else {
        res.json(data); // JSON par défaut
      }
    });
  },

  getArticleById: (req, res) => {
    Article.getById(req.params.id, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!data.length)
        return res.status(404).json({ error: "Article non trouvé" });
      res.json(data[0]);
    });
  },

  getArticlesByCategory: (req, res) => {
    Article.getByCategory(req.params.categoryId, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(data);
    });
  },

  createArticle: (req, res) => {
    Article.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Article créé" });
    });
  },

  updateArticle: (req, res) => {
    Article.update(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Article mis à jour" });
    });
  },

  deleteArticle: (req, res) => {
    Article.delete(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Article supprimé" });
    });
  },
  getGroupedByCategory: (req, res) => {
    const accept = req.headers["accept"];

    const query = `
      SELECT c.id as category_id, c.libelle, a.id as article_id, a.title, a.description
      FROM categories c
      LEFT JOIN articles a ON a.category_id = c.id
      ORDER BY c.id, a.created_at DESC
    `;

    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      
      const grouped = {};
      results.forEach((row) => {
        if (!grouped[row.libelle]) grouped[row.libelle] = [];
        if (row.article_id) {
          grouped[row.libelle].push({
            id: row.article_id,
            title: row.title,
            description: row.description,
          });
        }
      });

      if (accept === "application/xml") {
        const builder = new xml2js.Builder();
        const xml = builder.buildObject({ categories: grouped });
        res.set("Content-Type", "application/xml");
        res.send(xml);
      } else {
        res.json(grouped);
      }
    });
  },
  getGroupedByCategory: (req, res) => {
    const accept = req.headers["accept"];

    const query = `
      SELECT c.id as category_id, c.libelle, a.id as article_id, a.title, a.description
      FROM categories c
      LEFT JOIN articles a ON a.category_id = c.id
      ORDER BY c.id, a.created_at DESC
    `;

    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Transformer en structure groupée
      const grouped = {};
      results.forEach((row) => {
        if (!grouped[row.libelle]) grouped[row.libelle] = [];
        if (row.article_id) {
          grouped[row.libelle].push({
            id: row.article_id,
            title: row.title,
            description: row.description,
          });
        }
      });

      if (accept === "application/xml") {
        const builder = new xml2js.Builder();
        const xml = builder.buildObject({ categories: grouped });
        res.set("Content-Type", "application/xml");
        res.send(xml);
      } else {
        res.json(grouped);
      }
    });
  },
};

module.exports = ArticleController;
