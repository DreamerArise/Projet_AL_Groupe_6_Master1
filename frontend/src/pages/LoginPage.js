import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      const { token } = res.data;
      const decoded = parseJwt(token);

      login(token, decoded.role);

      if (decoded.role === "admin") {
        navigate("/dashboard/admin");
      } else if (decoded.role === "editeur") {
        navigate("/dashboard/editor");
      } else if (decoded.role === "visiteur") {
        navigate("/"); // Redirige le visiteur vers l'accueil
      } else {
        setError("Vous n'êtes pas autorisé(e).");
      }
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe invalide.");
    }
  };

  // 🔍 Décode le token JWT sans le valider
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return {};
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      fontFamily: 'Montserrat, Roboto, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 6px 32px 0 rgba(33, 150, 243, 0.10)',
        padding: '36px 32px 28px 32px',
        minWidth: 320,
        maxWidth: 360,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 style={{
          color: '#1976d2',
          fontWeight: 800,
          fontSize: 28,
          marginBottom: 24,
          letterSpacing: 0.5,
        }}>Connexion</h2>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 14px',
              marginBottom: 16,
              borderRadius: 10,
              border: '1px solid #bbdefb',
              fontSize: 16,
              fontFamily: 'Montserrat, Roboto, sans-serif',
              outline: 'none',
              transition: 'border 0.2s',
            }}
            onFocus={e => e.target.style.border = '1.5px solid #1976d2'}
            onBlur={e => e.target.style.border = '1px solid #bbdefb'}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 14px',
              marginBottom: 18,
              borderRadius: 10,
              border: '1px solid #bbdefb',
              fontSize: 16,
              fontFamily: 'Montserrat, Roboto, sans-serif',
              outline: 'none',
              transition: 'border 0.2s',
            }}
            onFocus={e => e.target.style.border = '1.5px solid #1976d2'}
            onBlur={e => e.target.style.border = '1px solid #bbdefb'}
          />
          <button type="submit" style={{
            width: '100%',
            background: 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '12px 0',
            fontSize: 17,
            fontWeight: 700,
            fontFamily: 'Montserrat, Roboto, sans-serif',
            boxShadow: '0 2px 8px 0 rgba(33, 150, 243, 0.05)',
            cursor: 'pointer',
            marginBottom: 10,
            transition: 'background 0.2s',
          }}
            onMouseOver={e => e.target.style.background = '#1976d2'}
            onMouseOut={e => e.target.style.background = 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)'}
          >Se connecter</button>
          {error && <p style={{ color: '#e53935', background: '#ffeaea', borderRadius: 8, padding: '8px 12px', marginTop: 6, fontWeight: 500, textAlign: 'center' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
