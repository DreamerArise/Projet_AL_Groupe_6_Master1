import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminPage = () => {
  const { token } = useContext(AuthContext);
  const [tokens, setTokens] = useState([]);
  const [users, setUsers] = useState([]);

  // --- TOKENS ---
  const fetchTokens = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tokens", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTokens(res.data);
    } catch (err) {
      console.error("Erreur chargement tokens");
    }
  };

  const deleteToken = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tokens/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTokens();
    } catch (err) {
      console.error("Erreur suppression token");
    }
  };

  // --- USERS ---
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur chargement users");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Erreur suppression utilisateur");
    }
  };

  useEffect(() => {
    fetchTokens();
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestion des jetons 🔐</h2>
      <ul>
        {tokens.map((t) => (
          <li key={t.id}>
            <code>{t.token}</code> (créé par: {t.admin})
            <button onClick={() => deleteToken(t.id)}>🗑 Supprimer</button>
          </li>
        ))}
      </ul>

      <h2>Gestion des utilisateurs 👥</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 10 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="5">Aucun utilisateur trouvé.</td></tr>
          ) : (
            users.map((user) => (
              <tr key={user.id || user._id}>
                <td>{user.id || user._id}</td>
                <td>{user.nom || user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => deleteUser(user.id || user._id)} style={{ color: "red" }}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
