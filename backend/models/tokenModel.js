const db = require("../config/db");

const Token = {
  create: (token, userId, callback) => {
    db.query(
      "INSERT INTO tokens (token, created_by) VALUES (?, ?)",
      [token, userId],
      callback
    );
  },

  getAll: (callback) => {
    db.query(
      `SELECT t.id, t.token, t.created_at, u.name AS admin 
       FROM tokens t 
       JOIN users u ON t.created_by = u.id`,
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM tokens WHERE id = ?", [id], callback);
  },

  exists: (token, callback) => {
    db.query(
      "SELECT * FROM tokens WHERE token = ?",
      [token],
      (err, results) => {
        if (err || results.length === 0) return callback(false);
        return callback(true);
      }
    );
  },
};

module.exports = Token;
