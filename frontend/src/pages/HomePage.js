import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div style={{ padding: "20px" }}>
      <h1>📰 Tous les articles</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="🔍 Rechercher par titre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      {/* Sélecteur de catégorie */}
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.libelle}
          </option>
        ))}
      </select>

      <button onClick={handleResetFilters} style={{ marginLeft: "10px" }}>
        Réinitialiser
      </button>

      {/* Liste des articles */}
      {articles.length === 0 && <p>Aucun article trouvé.</p>}
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>
              <Link to={`/article/${article.id}`}>{article.title}</Link>
            </h2>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          ⬅️ Précédent
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Suivant ➡️</button>
      </div>
    </div>
  );
};

export default HomePage;
