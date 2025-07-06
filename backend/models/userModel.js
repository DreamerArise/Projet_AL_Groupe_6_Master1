const db = require("../config/db");

const User = {
  getAll: (callback) => {
    db.query("SELECT * FROM users", callback);
  },

  getByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },

  create: (user, callback) => {
    const { name, email, password, role } = user;
    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role || "visiteur"],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [id], callback);
  },

  update: (user, callback) => {
    const { id, name, email, role } = user;
    db.query(
      "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
      [name, email, role, id],
      callback
    );
  },
};

module.exports = User;
