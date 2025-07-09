# Projet Architecture Logicielle - Groupe 6 (Master 1)

Plateforme de gestion d'articles avec back-end REST + SOAP, front-end React, et app cliente.

---

## Technologies utilisées

- **Backend** : Node.js + Express
- **Base de données** : MySQL
- **Front-end** : React.js
- **SOAP** : node-soap + WSDL
- **Client SOAP** : Python (Zeep) ou Java (wsimport)

---

## Fonctionnalités principales

### Authentification & rôles

- Inscription avec rôle (visiteur / éditeur)
- Connexion via JWT
- Déconnexion / Gestion du token
- Rôles :

  - `visiteur` : lecture uniquement
  - `editeur` : CRUD articles / catégories
  - `admin` : gestion utilisateurs & jetons

### Gestion des articles (REST)

- Création / modification / suppression d’articles (éditeur)
- Consultation publique (visiteur / non connecté)
- Pagination, recherche par mot-clé, filtrage par catégorie

### Gestion des catégories

- CRUD catégories par les éditeurs

### Gestion des jetons (admin)

- Génération / suppression de jetons via tableau de bord
- Liste des jetons existants

### Services SOAP

- `authenticate(email, password)`
- `getUsers(token)`
- `addUser(token, name, email, password, role)`

---

## Structure du projet

```
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   ├── wsdl
│   └── server.js
│
├── frontend
│   ├── pages
│   ├── components
│   ├── context
│   ├── routes
│   └── App.js
```

---

## Lancer le projet localement

### Backend

```bash
execute le fichier database.sql dans un terminal sql ou phpMyAdmin
cd backend
npm install
cp .env.example .env  # configurer DB & PORT
npx nodemon server.js
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### Tester les services SOAP

- URL du WSDL : `http://localhost:5000/wsdl`
- Tester avec SoapUI, Zeep (Python) ou wsimport (Java)

---

## Compte test disponible

```
Admin :
email : sokhna@example.com
mot de passe : azerty123

Éditeur :
email : mouride@example.com
mot de passe : mouride123
```

---

## Appel SOAP en Python (Zeep)

```python
from zeep import Client

client = Client('http://localhost:5000/wsdl')

# Authentification
res = client.service.authenticate(email='sokhna@example.com', password='azerty123')
print(res)

# getUsers
token = 'VOTRE_JETON_ICI'
users = client.service.getUsers(token)
print(users)

# Execution
python client_app.py
Entrer comme login sokhna@example.com et password azerty123
```

---

## Répartition des tâches

| Membre      | Rôle / Réalisations principales            |
| ----------- | ------------------------------------------ |
| **Sokhna**  | Backend (REST + SOAP), coordination projet |
| **Ndella**  | Frontend React                             |
| **Aïssata** | App cliente SOAP (Python)                  |

---

## Statut du projet : **Fonctionnel**

---
