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

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Tableau de bord Éditeur</h2>

      {/* Gestion des articles */}
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
      <h3>📚 Gestion des catégories</h3>
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
        style={{ marginBottom: "20px" }}
      >
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
            <button
              onClick={() => {
                setCategoryForm({ libelle: cat.libelle });
                setEditingCategoryId(cat.id);
              }}
            >✏️</button>
            <button
              onClick={async () => {
                try {
                  await axios.delete(
                    `http://localhost:5000/api/categories/${cat.id}`,
                    config
                  );
                  fetchCategories();
                  fetchArticles(); // Si une catégorie disparaît, il faut aussi actualiser les articles
                } catch (err) {
                  console.error("Erreur suppression catégorie");
                }
              }}
            >🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditorDashboard;
