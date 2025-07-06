const soap = require("soap");
const db = require("../config/db");
const bcrypt = require("bcryptjs");

const service = {
  UserService: {
    UserServiceSoapPort: {
      // 1. Authentification
      authenticate: function ({ email, password }, callback) {
        console.log("Reçu SOAP AUTH:", email, password);
        db.query(
          "SELECT * FROM users WHERE email = ?",
          [email],
          (err, results) => {
            if (err || results.length === 0) {
              console.log("[SOAP] Utilisateur non trouvé pour", email);
              return callback({ message: "Utilisateur non trouvé" });
            }

            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err || !isMatch) {
                console.log("[SOAP] Mot de passe incorrect pour", email);
                console.log(
                  "[SOAP] Callback avec erreur : Mot de passe incorrect"
                );
                return callback({ message: "Mot de passe incorrect" });
              }

              console.log("[SOAP] Authentification réussie pour", email);
              console.log(
                "[SOAP] Callback avec succès : Authentification réussie"
              );
              return callback(null, {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                message: "Authentification réussie",
              });
            });
          }
        );
      },

      // 2. Lister les utilisateurs
      getUsers: function ({ token }, callback) {
        verifyToken(token, (isValid) => {
          if (!isValid) {
            console.log("[SOAP] Callback avec erreur : Jeton invalide");
            return callback({ message: "Jeton invalide" });
          }

          db.query("SELECT id, name, email, role FROM users", (err, users) => {
            if (err) {
              console.log("[SOAP] Erreur SQL getUsers:", err.message);
              console.log("[SOAP] Callback avec erreur : Erreur SQL");
              return callback({ message: err.message });
            }
            console.log("[SOAP] Utilisateurs listés:", users.length);
            console.log("[SOAP] Callback avec succès : Utilisateurs listés");
            callback(null, { users });
          });
        });
      },

      // 3. Ajouter un utilisateur
      addUser: function ({ token, name, email, password, role }, callback) {
        verifyToken(token, (isValid) => {
          if (!isValid) {
            console.log("[SOAP] Callback avec erreur : Jeton invalide");
            return callback({ message: "Jeton invalide" });
          }

          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              console.log("[SOAP] Callback avec erreur : Erreur de hashage");
              return callback({ message: err.message });
            }

            db.query(
              "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
              [name, email, hash, role || "visiteur"],
              (err) => {
                if (err) {
                  console.log("[SOAP] Erreur SQL addUser:", err.message);
                  console.log("[SOAP] Callback avec erreur : Erreur SQL");
                  return callback({ message: err.message });
                }
                console.log("[SOAP] Utilisateur ajouté:", email);
                console.log("[SOAP] Callback avec succès : Utilisateur ajouté");
                callback(null, { message: "Utilisateur ajouté" });
              }
            );
          });
        });
      },

      // 4. Supprimer un utilisateur
      deleteUser: function ({ token, id }, callback) {
        verifyToken(token, (isValid) => {
          if (!isValid) {
            console.log("[SOAP] Callback avec erreur : Jeton invalide");
            return callback({ message: "Jeton invalide" });
          }

          db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
            if (err) {
              console.log("[SOAP] Erreur SQL deleteUser:", err.message);
              console.log("[SOAP] Callback avec erreur : Erreur SQL");
              return callback({ message: err.message });
            }
            console.log("[SOAP] Utilisateur supprimé:", id);
            console.log("[SOAP] Callback avec succès : Utilisateur supprimé");
            callback(null, { message: "Utilisateur supprimé" });
          });
        });
      },

      // 5. Modifier un utilisateur
      updateUser: function ({ token, id, name, email, role }, callback) {
        verifyToken(token, (isValid) => {
          if (!isValid) return callback({ message: "Jeton invalide" });

          db.query(
            "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
            [name, email, role, id],
            (err) => {
              if (err) {
                console.log("[SOAP] Erreur SQL updateUser:", err.message);
                return callback({ message: err.message });
              }
              console.log("[SOAP] Utilisateur mis à jour:", id);
              callback(null, { message: "Utilisateur mis à jour" });
            }
          );
        });
      },
    },
  },
};

//Verification du jeton SOAP
function verifyToken(token, cb) {
  db.query("SELECT * FROM tokens WHERE token = ?", [token], (err, results) => {
    if (err || results.length === 0) return cb(false);
    return cb(true);
  });
}

module.exports = service;
