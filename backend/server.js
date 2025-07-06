const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const userRoutes = require("./routes/userRoutes");

// Pour SOAP
const fs = require("fs");
const http = require("http");
const soap = require("soap");
const soapService = require("./soap/service");
const wsdl = fs.readFileSync("./soap/userService.wsdl", "utf8");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes REST
app.get("/", (req, res) => {
  res.send("API en ligne ✅");
});
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/users", userRoutes);

// Creer le serveur HTTP et y monter SOAP
const server = http.createServer(app);

// Ajouter le service SOAP à /wsdl
soap.listen(server, "/wsdl", soapService, wsdl, () => {
  console.log("SOAP service is ready");
});

// Démarrer le serveur (REST + SOAP)
server.listen(PORT, () => {
  console.log(`Serveur SOAP/REST lancé sur http://localhost:${PORT}`);
});
