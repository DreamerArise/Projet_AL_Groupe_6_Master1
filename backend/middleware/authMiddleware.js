const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET_KEY"); // 🔒 à remplacer par process.env.SECRET_KEY
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token invalide ou expiré" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Accès refusé : administrateur requis" });
  }
  next();
};

const isEditor = (req, res, next) => {
  if (req.user.role !== "editeur" && req.user.role !== "admin") {
    return res.status(403).json({ error: "Accès refusé : éditeur requis" });
  }
  next();
};

module.exports = { authenticate, isAdmin, isEditor };
