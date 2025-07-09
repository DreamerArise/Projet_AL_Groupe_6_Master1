import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Styles intégrés pour la HomePage
const styles = {
  hero: {
    background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
    color: "#fff",
    padding: "60px 0 40px 0",
    textAlign: "center",
    fontFamily: "Montserrat, Roboto, Arial, sans-serif",
    marginBottom: 40,
    boxShadow: "0 2px 12px rgba(33,150,243,0.07)",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "0 16px",
    fontFamily: "Montserrat, Roboto, Arial, sans-serif",
  },
  searchBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    margin: "24px 0",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    padding: "10px 14px",
    border: "1px solid #b3c6e0",
    borderRadius: 8,
    fontSize: 16,
    minWidth: 220,
    marginRight: 8,
  },
  select: {
    padding: "10px 14px",
    border: "1px solid #b3c6e0",
    borderRadius: 8,
    fontSize: 16,
    marginRight: 8,
    minWidth: 180,
  },
  resetBtn: {
    padding: "10px 18px",
    borderRadius: 8,
    background: "#e3f2fd",
    color: "#1976d2",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 16,
    transition: "background 0.2s, color 0.2s",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 8px rgba(33,150,243,0.08)",
    padding: 24,
    margin: "18px 0",
    transition: "box-shadow 0.2s",
    border: "1px solid #e3ecfa",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#222",
    marginBottom: 8,
    textDecoration: "none",
    transition: "color 0.2s",
  },
  cardDesc: {
    color: "#444",
    fontSize: 16,
    marginBottom: 12,
  },
  cardMeta: {
    fontSize: 14,
    color: "#888",
    marginBottom: 0,
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    margin: "36px 0 0 0",
  },
  pagBtn: {
    padding: "8px 18px",
    borderRadius: 8,
    background: "#fff",
    color: "#2196f3",
    border: "1px solid #b3c6e0",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 16,
    transition: "background 0.2s, color 0.2s",
    minWidth: 90,
  },
  pagBtnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur chargement catégories");
    }
  };

  const fetchArticles = async () => {
    try {
      const params = {
        page,
        limit: 5,
        search,
        category_id: categoryId,
      };

      const res = await axios.get("http://localhost:5000/api/articles", {
        params,
      });
      setArticles(res.data);
    } catch (err) {
      console.error("Erreur chargement articles", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [search, categoryId, page]);

  const handleResetFilters = () => {
    setSearch("");
    setCategoryId("");
    setPage(1);
  };

  return (
    <>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 16 }}>Bienvenue sur le Centre d’Articles</h1>
        <p style={{ fontSize: 20, color: "#e3f2fd", marginBottom: 28 }}>
          Découvrez, recherchez et explorez les dernières actualités, tutoriels et ressources partagées par notre communauté.
        </p>
        <a href="#articles" style={{
          display: "inline-block",
          padding: "14px 38px",
          borderRadius: 30,
          background: "#fff",
          color: "#2196f3",
          fontWeight: 700,
          fontSize: 18,
          textDecoration: "none",
          boxShadow: "0 2px 8px rgba(33,150,243,0.10)",
          transition: "background 0.2s, color 0.2s"
        }}>Commencer</a>
      </section>

      {/* Main Content */}
      <main style={styles.container} id="articles">
        {/* Barre de recherche et filtres */}
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Rechercher par titre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            style={styles.select}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.libelle}
              </option>
            ))}
          </select>
          <button onClick={handleResetFilters} style={styles.resetBtn}>Réinitialiser</button>
        </div>

        {/* Liste des articles */}
        {articles.length === 0 ? (
          <div style={{ textAlign: "center", margin: "64px 0", color: "#888", fontSize: 20 }}>
            Aucun article trouvé.
          </div>
        ) : (
          <div>
            {articles.map((article) => (
              <div key={article.id} style={styles.card}>
                <h2 style={styles.cardTitle}>
                  <Link to={`/article/${article.id}`} style={{ color: "#1976d2", textDecoration: "none" }}>
                    {article.title}
                  </Link>
                </h2>
                <p style={styles.cardDesc}>{article.description}</p>
                <div style={styles.cardMeta}>
                  {article.author && <span>Par {article.author}</span>}
                  {article.created_at && (
                    <span style={{ marginLeft: 12 }}>
                      {new Date(article.created_at).toLocaleDateString("fr-FR")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div style={styles.pagination}>
          <button
            style={page === 1 ? { ...styles.pagBtn, ...styles.pagBtnDisabled } : styles.pagBtn}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Précédent
          </button>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Page {page}</span>
          <button
            style={styles.pagBtn}
            onClick={() => setPage((p) => p + 1)}
          >
            Suivant
          </button>
        </div>
      </main>
    </>
  );
};

export default HomePage;
