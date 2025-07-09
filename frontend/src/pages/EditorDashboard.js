import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditorDashboard = () => {
  const { token } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category_id: 1,
  });
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState([]);
  // Gestion des catégories
  const [categoryForm, setCategoryForm] = useState({ libelle: "" });
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/articles", config);
      setArticles(res.data);
    } catch (err) {
      console.error("Erreur chargement articles");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur chargement catégories");
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/articles/${editingId}`,
          form,
          config
        );
      } else {
        await axios.post("http://localhost:5000/api/articles", form, config);
      }
      setForm({ title: "", description: "", content: "", category_id: 1 });
      setEditingId(null);
      fetchArticles();
    } catch (err) {
      console.error("Erreur enregistrement article");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/articles/${id}`, config);
      fetchArticles();
    } catch (err) {
      console.error("Erreur suppression article");
    }
  };

  const handleEdit = (article) => {
    setForm({
      title: article.title,
      description: article.description,
      content: article.content,
      category_id: article.category_id,
    });
    setEditingId(article.id);
  };

  // Styles dashboard
  const dashboardStyles = {
    fontFamily: "Montserrat, Roboto, Arial, sans-serif",
    background: "#f5f8fb",
    minHeight: "100vh",
    padding: 0,
    margin: 0,
  };
  const section = {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 8px rgba(33,150,243,0.07)",
    padding: 32,
    margin: "32px auto",
    maxWidth: 900,
  };
  const header = {
    background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
    color: "#fff",
    padding: "40px 0 30px 0",
    textAlign: "center",
    fontWeight: 800,
    fontSize: 32,
    letterSpacing: 1,
    boxShadow: "0 2px 8px rgba(33,150,243,0.10)",
    marginBottom: 0,
  };
  const formStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center",
    marginBottom: 28,
  };
  const input = {
    padding: "10px 14px",
    border: "1px solid #b3c6e0",
    borderRadius: 8,
    fontSize: 16,
    minWidth: 180,
    flex: 1,
  };
  const textarea = {
    ...input,
    minHeight: 60,
    resize: "vertical",
  };
  const select = {
    ...input,
    minWidth: 140,
  };
  const btn = {
    padding: "10px 22px",
    borderRadius: 8,
    background: "#2196f3",
    color: "#fff",
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 16,
    transition: "background 0.2s, color 0.2s",
    marginRight: 8,
  };
  const btnCancel = {
    ...btn,
    background: "#e3f2fd",
    color: "#2196f3",
    border: "1px solid #2196f3",
  };
  const list = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };
  const card = {
    background: "#f8fbff",
    borderRadius: 12,
    boxShadow: "0 1px 4px rgba(33,150,243,0.06)",
    padding: 18,
    margin: "14px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  };
  const cardTitle = {
    fontWeight: 700,
    color: "#1976d2",
    fontSize: 18,
    marginBottom: 4,
  };
  const cardDesc = {
    color: "#444",
    fontSize: 15,
    marginBottom: 0,
  };
  const cardActions = {
    display: "flex",
    gap: 8,
  };

  return (
    <div style={dashboardStyles}>
      <div style={header}>Tableau de bord Éditeur</div>

      {/* Gestion des articles */}
      <section style={section}>
        <h2 style={{ color: "#1976d2", fontWeight: 800, fontSize: 24 }}>
          Gestion des articles
        </h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            name="title"
            placeholder="Titre"
            value={form.title}
            onChange={handleChange}
            required
            style={input}
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            style={input}
          />
          <textarea
            name="content"
            placeholder="Contenu"
            value={form.content}
            onChange={handleChange}
            required
            style={textarea}
          />
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            style={select}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.libelle}
              </option>
            ))}
          </select>
          <button type="submit" style={btn}>
            {editingId ? "Modifier" : "Ajouter"} l’article
          </button>
          {editingId && (
            <button
              type="button"
              style={btnCancel}
              onClick={() => {
                setEditingId(null);
                setForm({
                  title: "",
                  description: "",
                  content: "",
                  category_id: 1,
                });
              }}
            >
              Annuler
            </button>
          )}
        </form>
        <ul style={list}>
          {articles.map((a) => (
            <li key={a.id} style={card}>
              <div>
                <div style={cardTitle}>{a.title}</div>
                <div style={cardDesc}>{a.description}</div>
              </div>
              <div style={cardActions}>
                <button style={btnCancel} onClick={() => handleEdit(a)}>
                  Éditer
                </button>
                <button style={btn} onClick={() => handleDelete(a.id)}>
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Gestion des catégories */}
      <section style={section}>
        <h2 style={{ color: "#1976d2", fontWeight: 800, fontSize: 24 }}>
          Gestion des catégories
        </h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              if (editingCategoryId) {
                await axios.put(
                  `http://localhost:5000/api/categories/${editingCategoryId}`,
                  categoryForm,
                  config
                );
              } else {
                await axios.post(
                  "http://localhost:5000/api/categories",
                  categoryForm,
                  config
                );
              }
              setCategoryForm({ libelle: "" });
              setEditingCategoryId(null);
              fetchCategories();
            } catch (err) {
              console.error("Erreur enregistrement catégorie");
            }
          }}
          style={formStyle}
        >
          <input
            name="libelle"
            placeholder="Nom de la catégorie"
            value={categoryForm.libelle}
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, libelle: e.target.value })
            }
            required
            style={input}
          />
          <button type="submit" style={btn}>
            {editingCategoryId ? "Modifier" : "Ajouter"} la catégorie
          </button>
          {editingCategoryId && (
            <button
              type="button"
              style={btnCancel}
              onClick={() => {
                setEditingCategoryId(null);
                setCategoryForm({ libelle: "" });
              }}
            >
              Annuler
            </button>
          )}
        </form>
        <ul style={list}>
          {categories.map((cat) => (
            <li key={cat.id} style={card}>
              <div style={cardTitle}>{cat.libelle}</div>
              <div style={cardActions}>
                <button
                  style={btnCancel}
                  onClick={() => {
                    setCategoryForm({ libelle: cat.libelle });
                    setEditingCategoryId(cat.id);
                  }}
                >
                  Éditer
                </button>
                <button
                  style={btn}
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `http://localhost:5000/api/categories/${cat.id}`,
                        config
                      );
                      fetchCategories();
                      fetchArticles();
                    } catch (err) {
                      console.error("Erreur suppression catégorie");
                    }
                  }}
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default EditorDashboard;
