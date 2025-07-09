import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const TokenPage = () => {
  const { token } = useContext(AuthContext);
  const [tokens, setTokens] = useState([]);

  const fetchTokens = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tokens", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTokens(res.data);
    } catch (err) {
      setTokens([]);
    }
  };

  const deleteToken = async (id) => {
    if (!window.confirm("Supprimer ce token ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tokens/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTokens();
    } catch (err) {}
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        fontFamily: "Montserrat, Roboto, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 6px 32px 0 rgba(33, 150, 243, 0.10)",
          padding: "36px 32px 28px 32px",
          minWidth: 340,
          maxWidth: 700,
          width: "100%",
          margin: 24,
        }}
      >
        <h2
          style={{
            color: "#1976d2",
            fontWeight: 800,
            fontSize: 26,
            marginBottom: 18,
            letterSpacing: 0.5,
          }}
        >
          Gestion des jetons{" "}
          <span role="img" aria-label="clé">
            🔐
          </span>
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginBottom: 0,
          }}
        >
          {tokens.length === 0 ? (
            <li style={{ color: "#888", fontStyle: "italic" }}>
              Aucun jeton trouvé.
            </li>
          ) : (
            tokens.map((t) => (
              <li
                key={t.id}
                style={{
                  background: "#f5faff",
                  borderRadius: 10,
                  marginBottom: 10,
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 15,
                }}
              >
                <span>
                  <code
                    style={{
                      background: "#e3f2fd",
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontSize: 14,
                    }}
                  >
                    {t.token.substring(0, 24) + "..."}
                  </code>
                  <span
                    style={{
                      color: "#1976d2",
                      fontWeight: 600,
                      marginLeft: 10,
                    }}
                  >
                    créé par: {t.admin}
                  </span>
                </span>
                <button
                  onClick={() => deleteToken(t.id)}
                  style={{
                    background:
                      "linear-gradient(90deg, #e57373 0%, #ffb74d 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 16,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#d32f2f")}
                  onMouseOut={(e) =>
                    (e.target.style.background =
                      "linear-gradient(90deg, #e57373 0%, #ffb74d 100%)")
                  }
                >
                  🗑 Supprimer
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TokenPage;
