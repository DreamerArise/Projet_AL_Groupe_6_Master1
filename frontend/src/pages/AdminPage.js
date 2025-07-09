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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      fontFamily: 'Montserrat, Roboto, sans-serif',
      padding: 0,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 6px 32px 0 rgba(33, 150, 243, 0.10)',
        padding: '36px 32px 28px 32px',
        minWidth: 340,
        maxWidth: 900,
        width: '100%',
        margin: 24,
      }}>
        <h2 style={{
          color: '#1976d2',
          fontWeight: 800,
          fontSize: 26,
          marginBottom: 18,
          letterSpacing: 0.5,
        }}>Gestion des jetons <span role="img" aria-label="clé">🔐</span></h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          marginBottom: 32,
        }}>
          {tokens.length === 0 ? (
            <li style={{ color: '#888', fontStyle: 'italic' }}>Aucun jeton trouvé.</li>
          ) : (
            tokens.map((t) => (
              <li key={t.id} style={{
                background: '#f5faff',
                borderRadius: 10,
                marginBottom: 10,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 15,
              }}>
                <span>
                  <code style={{ background: '#e3f2fd', borderRadius: 6, padding: '2px 8px', fontSize: 14 }}>{t.token.substring(0, 24) + '...'}</code>
                  <span style={{ color: '#1976d2', fontWeight: 600, marginLeft: 10 }}>créé par: {t.admin}</span>
                </span>
                <button
                  onClick={() => deleteToken(t.id)}
                  style={{
                    background: 'linear-gradient(90deg, #e57373 0%, #ffb74d 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 14px',
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 16,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={e => e.target.style.background = '#d32f2f'}
                  onMouseOut={e => e.target.style.background = 'linear-gradient(90deg, #e57373 0%, #ffb74d 100%)'}
                >🗑 Supprimer</button>
              </li>
            ))
          )}
        </ul>

        <h2 style={{
          color: '#1976d2',
          fontWeight: 800,
          fontSize: 26,
          marginBottom: 18,
          letterSpacing: 0.5,
        }}>Gestion des utilisateurs <span role="img" aria-label="utilisateurs">👥</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: '#fafcff',
            borderRadius: 10,
            overflow: 'hidden',
            fontSize: 15,
          }}>
            <thead style={{ background: '#e3f2fd' }}>
              <tr>
                <th style={{ padding: '12px 8px', color: '#1976d2', fontWeight: 700 }}>ID</th>
                <th style={{ padding: '12px 8px', color: '#1976d2', fontWeight: 700 }}>Nom</th>
                <th style={{ padding: '12px 8px', color: '#1976d2', fontWeight: 700 }}>Email</th>
                <th style={{ padding: '12px 8px', color: '#1976d2', fontWeight: 700 }}>Rôle</th>
                <th style={{ padding: '12px 8px', color: '#1976d2', fontWeight: 700 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="5" style={{ color: '#888', fontStyle: 'italic', textAlign: 'center', padding: 18 }}>Aucun utilisateur trouvé.</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id || user._id} style={{ borderBottom: '1px solid #e3eaf5' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 600 }}>{user.id || user._id}</td>
                    <td style={{ padding: '10px 8px' }}>{user.nom || user.name}</td>
                    <td style={{ padding: '10px 8px' }}>{user.email}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <span style={{
                        color: user.role === 'admin' ? '#d32f2f' : user.role === 'editeur' ? '#1976d2' : '#388e3c',
                        background: user.role === 'admin' ? '#ffebee' : user.role === 'editeur' ? '#e3f2fd' : '#e8f5e9',
                        borderRadius: 8,
                        padding: '4px 12px',
                        fontWeight: 700,
                        fontSize: 14,
                      }}>{user.role}</span>
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      <button
                        onClick={() => deleteUser(user.id || user._id)}
                        style={{
                          background: 'linear-gradient(90deg, #e57373 0%, #ffb74d 100%)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '6px 14px',
                          fontWeight: 700,
                          fontSize: 14,
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onMouseOver={e => e.target.style.background = '#d32f2f'}
                        onMouseOut={e => e.target.style.background = 'linear-gradient(90deg, #e57373 0%, #ffb74d 100%)'}
                      >Supprimer</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
