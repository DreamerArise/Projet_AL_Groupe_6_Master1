const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthController = {
  register: (req, res) => {
    const { name, email, password, role } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: "Erreur de hachage" });

      db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hash, role || "visiteur"],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: "Utilisateur créé" });
        }
      );
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "Utilisateur non trouvé" });

      const user = results[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: "Erreur serveur" });
        if (!isMatch)
          return res.status(401).json({ error: "Mot de passe incorrect" });

        const token = jwt.sign(
          { id: user.id, role: user.role },
          "SECRET_KEY", // 🔒 À placer dans .env plus tard
          { expiresIn: "2h" }
        );

        res.status(200).json({ message: "Connexion réussie", token });
      });
    });
  },
};

module.exports = AuthController;
