import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);

  const renderDashboardLink = () => {
    if (role === "admin")
      return <Link to="/dashboard/admin">Dashboard Admin</Link>;
    if (role === "editeur")
      return <Link to="/dashboard/editor">Dashboard Éditeur</Link>;
    return null;
  };

  return (
    <nav className="navbar">
      <Link to="/">Accueil</Link>
      {!token && <Link to="/login">Connexion</Link>}
      {!token && <Link to="/register">Inscription</Link>}
      {token && renderDashboardLink()}
      {token && <Link to="/profile">Profil</Link>}
      {role === "admin" && <Link to="/admin">Admin</Link>}
      {role === "admin" && <Link to="/tokens">Tokens</Link>}
      {token && <button onClick={logout}>Déconnexion</button>}
    </nav>
  );
};

export default Navbar;
