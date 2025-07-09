import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "visiteur",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage("Inscription réussie ");
    } catch (err) {
      setMessage("Erreur lors de l'inscription ");
    }
  };

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
          minWidth: 320,
          maxWidth: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#1976d2",
            fontWeight: 800,
            fontSize: 28,
            marginBottom: 24,
            letterSpacing: 0.5,
          }}
        >
          Inscription
        </h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            name="name"
            onChange={handleChange}
            placeholder="Nom"
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              marginBottom: 16,
              borderRadius: 10,
              border: "1px solid #bbdefb",
              fontSize: 16,
              fontFamily: "Montserrat, Roboto, sans-serif",
              outline: "none",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.border = "1.5px solid #1976d2")}
            onBlur={(e) => (e.target.style.border = "1px solid #bbdefb")}
          />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              marginBottom: 16,
              borderRadius: 10,
              border: "1px solid #bbdefb",
              fontSize: 16,
              fontFamily: "Montserrat, Roboto, sans-serif",
              outline: "none",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.border = "1.5px solid #1976d2")}
            onBlur={(e) => (e.target.style.border = "1px solid #bbdefb")}
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Mot de passe"
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              marginBottom: 16,
              borderRadius: 10,
              border: "1px solid #bbdefb",
              fontSize: 16,
              fontFamily: "Montserrat, Roboto, sans-serif",
              outline: "none",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.border = "1.5px solid #1976d2")}
            onBlur={(e) => (e.target.style.border = "1px solid #bbdefb")}
          />
          <select
            name="role"
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px 14px",
              marginBottom: 18,
              borderRadius: 10,
              border: "1px solid #bbdefb",
              fontSize: 16,
              fontFamily: "Montserrat, Roboto, sans-serif",
              background: "#f5faff",
              outline: "none",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.border = "1.5px solid #1976d2")}
            onBlur={(e) => (e.target.style.border = "1px solid #bbdefb")}
          >
            <option value="visiteur">Visiteur</option>
            <option value="editeur">Éditeur</option>
          </select>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px 0",
              fontSize: 17,
              fontWeight: 700,
              fontFamily: "Montserrat, Roboto, sans-serif",
              boxShadow: "0 2px 8px 0 rgba(33, 150, 243, 0.05)",
              cursor: "pointer",
              marginBottom: 10,
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#1976d2")}
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)")
            }
          >
            S'inscrire
          </button>
        </form>
        {message && (
          <p
            style={{
              color: message.includes("réussie") ? "#388e3c" : "#e53935",
              background: message.includes("réussie") ? "#e8f5e9" : "#ffeaea",
              borderRadius: 8,
              padding: "8px 12px",
              marginTop: 10,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
