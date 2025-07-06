import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/articles/${id}`)
      .then((res) => setArticle(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!article) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticlePage;
