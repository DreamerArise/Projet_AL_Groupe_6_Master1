import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category_id: 1,
  });
  const [editingId, setEditingId] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ libelle: "" });
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // --- ARTICLES ---
  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/articles", config);
      setArticles(res.data);
    } catch (err) {
      console.error("Erreur chargement articles");
    }
  };
  // --- CATEGORIES ---
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur chargement catégories");
    }
  };
  // CRUD Articles
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/articles/${editingId}`, form, config);
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
  // CRUD Catégories
  const handleCategorySubmit = async (e) => {
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
  };
  const handleCategoryEdit = (cat) => {
    setCategoryForm({ libelle: cat.libelle });
    setEditingCategoryId(cat.id);
  };
  const handleCategoryDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`, config);
      fetchCategories();
      fetchArticles();
    } catch (err) {
      console.error("Erreur suppression catégorie");
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Tableau de bord admin 🛠️</h1>
      {/* Gestion des articles */}
      <hr style={{ margin: '30px 0' }} />
      <h2>Gestion des articles 📰</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          name="title"
          placeholder="Titre"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Contenu"
          value={form.content}
          onChange={handleChange}
          required
        />
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.libelle}
            </option>
          ))}
        </select>
        <button type="submit">
          {editingId ? "Modifier" : "Ajouter"} l’article
        </button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setForm({ title: "", description: "", content: "", category_id: 1 });
          }}>
            Annuler
          </button>
        )}
      </form>
      <ul>
        {articles.map((a) => (
          <li key={a.id}>
            <strong>{a.title}</strong> - {a.description}
            <button onClick={() => handleEdit(a)}>✏️</button>
            <button onClick={() => handleDelete(a.id)}>🗑</button>
          </li>
        ))}
      </ul>

      {/* Gestion des catégories */}
      <hr style={{ margin: '30px 0' }} />
      <h2>Gestion des catégories 📚</h2>
      <form onSubmit={handleCategorySubmit} style={{ marginBottom: "20px" }}>
        <input
          name="libelle"
          placeholder="Nom de la catégorie"
          value={categoryForm.libelle}
          onChange={e => setCategoryForm({ ...categoryForm, libelle: e.target.value })}
          required
        />
        <button type="submit">
          {editingCategoryId ? "Modifier" : "Ajouter"} la catégorie
        </button>
        {editingCategoryId && (
          <button type="button" onClick={() => {
            setEditingCategoryId(null);
            setCategoryForm({ libelle: "" });
          }}>
            Annuler
          </button>
        )}
      </form>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <strong>{cat.libelle}</strong>
            <button onClick={() => handleCategoryEdit(cat)}>✏️</button>
            <button onClick={() => handleCategoryDelete(cat.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

