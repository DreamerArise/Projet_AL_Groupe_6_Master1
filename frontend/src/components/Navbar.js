import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const renderDashboardLink = () => {
    if (role === "admin")
      return <Link to="/dashboard/admin" className={location.pathname === "/dashboard/admin" ? "active" : ""}>Dashboard Admin</Link>;
    if (role === "editeur")
      return <Link to="/dashboard/editor" className={location.pathname === "/dashboard/editor" ? "active" : ""}>Dashboard Éditeur</Link>;
    return null;
  };

  // Ferme le menu mobile lors d'un clic sur un lien
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span style={{transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'}}></span>
        <span style={{opacity: menuOpen ? 0 : 1}}></span>
        <span style={{transform: menuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'}}></span>
      </button>
      <div className={`navbar-links${menuOpen ? " open" : ""}`}>
        <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={handleLinkClick}>Accueil</Link>
        {!token && <Link to="/login" className={location.pathname === "/login" ? "active" : ""} onClick={handleLinkClick}>Connexion</Link>}
        {!token && <Link to="/register" className={location.pathname === "/register" ? "active" : ""} onClick={handleLinkClick}>Inscription</Link>}
        {token && renderDashboardLink() && React.cloneElement(renderDashboardLink(), { onClick: handleLinkClick })}
        {token && <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""} onClick={handleLinkClick}>Profil</Link>}
        {role === "admin" && <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""} onClick={handleLinkClick}>Admin</Link>}
        {role === "admin" && <Link to="/tokens" className={location.pathname === "/tokens" ? "active" : ""} onClick={handleLinkClick}>Tokens</Link>}
        {token && <button onClick={() => { logout(); handleLinkClick(); }}>Déconnexion</button>}
      </div>
    </nav>
  );
};

export default Navbar;
