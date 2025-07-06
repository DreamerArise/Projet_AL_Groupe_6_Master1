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
      setMessage("Inscription réussie ✅");
    } catch (err) {
      setMessage("Erreur lors de l'inscription ❌");
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" onChange={handleChange} placeholder="Nom" required />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />
        <select name="role" onChange={handleChange}>
          <option value="visiteur">Visiteur</option>
          <option value="editeur">Éditeur</option>
        </select>
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPage;
