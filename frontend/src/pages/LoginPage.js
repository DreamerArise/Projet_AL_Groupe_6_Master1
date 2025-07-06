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
    <div style={{ padding: "20px" }}>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px" }}
        />
        <button type="submit">Se connecter</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
