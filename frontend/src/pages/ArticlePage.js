import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Utilitaire pour trouver le nom de l'auteur selon toutes les propriétés courantes
function getAuthor(article) {
  if (!article) return "Auteur inconnu";
  if (article.author) return article.author;
  if (article.auteur) return article.auteur;
  if (article.created_by) return article.created_by;
  if (article.user) {
    if (typeof article.user === 'string') return article.user;
    if (article.user.name) return article.user.name;
    if (article.user.nom) return article.user.nom;
    if (article.user.username) return article.user.username;
  }
  if (article.author_id) return `Auteur #${article.author_id}`;
  return "Auteur inconnu";
}

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/articles/${id}`)
      .then((res) => setArticle(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!article) return (
    <div style={{ fontFamily: 'Montserrat, Roboto, Arial, sans-serif', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#1976d2' }}>
      Chargement…
    </div>
  );

  // Pour la date lisible
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div style={{
      fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
      background: 'linear-gradient(120deg, #e3f2fd 0%, #fff 100%)',
      minHeight: '100vh',
      padding: 0,
      margin: 0,
    }}>
      <div style={{ maxWidth: 800, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(33,150,243,0.07)', padding: '36px 28px 40px 28px', position: 'relative' }}>
        <a
          href="/"
          style={{
            position: 'absolute',
            left: 24,
            top: 18,
            color: '#2196f3',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 16,
            background: '#e3f2fd',
            borderRadius: 8,
            padding: '6px 16px',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => e.target.style.background = '#bbdefb'}
          onMouseOut={e => e.target.style.background = '#e3f2fd'}
        >← Accueil</a>
        <h1 style={{
          color: '#1976d2',
          fontWeight: 900,
          fontSize: 36,
          marginBottom: 12,
          letterSpacing: 0.5,
        }}>{article.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <span style={{ color: '#555', fontWeight: 500, fontSize: 15 }}>
            Par <span style={{ color: '#1976d2', fontWeight: 700 }}>{getAuthor(article)}</span>
          </span>
          {article.created_at && (
            <span style={{ color: '#888', fontSize: 14 }}>
              {formatDate(article.created_at)}
            </span>
          )}
        </div>
        <hr style={{ border: 0, borderTop: '1px solid #e3eaf5', margin: '18px 0 32px 0' }} />
        <div style={{
          color: '#232323',
          fontSize: 19,
          lineHeight: 1.7,
          letterSpacing: 0.01,
          whiteSpace: 'pre-line',
          marginBottom: 16,
        }}>{article.content}</div>
      </div>
    </div>
  );
};

export default ArticlePage;
