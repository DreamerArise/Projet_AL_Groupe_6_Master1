import getpass
import token
from zeep import Client

# Remplace cette URL par celle de ton service si besoin
WSDL_URL = "http://localhost:5000/wsdl?wsdl"

client = Client(WSDL_URL)

def authenticate():
    print("=== Authentification ===")
    login = input("Login: ")
    password = getpass.getpass("Mot de passe: ")
    try:
        # Appelle la bonne opération SOAP
        response = client.service.authenticate(login, password)
        # Adapte le parsing selon la réponse réelle
        if hasattr(response, 'token') and hasattr(response, 'role'):
            print("Authentification réussie. Jeton:", response.token)
            return response.token, response.role
        else:
            print("Echec de l'authentification :", response)
            return None, None
    except Exception as e:
        print("Erreur lors de l'appel SOAP:", e)
        return None, None

import json

def getUsers(token):
    print("\n=== Liste des utilisateurs ===")
    try:
        try:
            users_response = client.service.getUsers(token=token)
            if hasattr(users_response, 'users'):
                try:
                    users_list = json.loads(users_response.users)
                    for user in users_list:
                        if 'erreur' in user:
                            print(f"Erreur du serveur : {user['erreur']}")
                        else:
                            print(f"ID: {user['id']}, Login: {user['name']}, Email: {user['email']}, Rôle: {user['role']}")
                except Exception as e:
                    print("Erreur de parsing JSON:", e)
                    print(users_response.users)
            elif hasattr(users_response, 'message'):
                print(f"Erreur du serveur : {users_response.message}")
            else:
                print(users_response)
        except Exception as e:
            print("Erreur lors de la récupération des utilisateurs:", e)
    except Exception as e:
        print("Erreur lors de la récupération des utilisateurs:", e)


def add_user(token):
    print("\n=== Ajouter un utilisateur ===")
    login = input("Login: ")
    password = getpass.getpass("Mot de passe: ")
    role = input("Rôle (admin/editor/visitor): ")
    try:
        result = client.service.addUser(
            token=token,
            name=login,
            email=login,
            password=password,
            role=role
        )
        # Gérer le cas où le backend retourne une string ou un objet
        if isinstance(result, dict) and 'message' in result:
            print(result['message'])
        elif isinstance(result, str):
            print(result)
        else:
            print(result)
    except Exception as e:
        print("Erreur lors de l'ajout:", e)

def modify_user(token):
    print("\n=== Modifier un utilisateur ===")
    user_id = input("ID de l'utilisateur à modifier: ")
    login = input("Nouveau login: ")
    password = getpass.getpass("Nouveau mot de passe: ")
    role = input("Nouveau rôle: ")
    try:
        result = client.service.modifyUser(token, int(user_id), login, password, role)
        print(result['message'])
    except Exception as e:
        print("Erreur lors de la modification:", e)

def delete_user(token):
    print("\n=== Supprimer un utilisateur ===")
    user_id = input("ID de l'utilisateur à supprimer: ")
    try:
        result = client.service.deleteUser(token, int(user_id))
        print(result['message'])
    except Exception as e:
        print("Erreur lors de la suppression:", e)

def main():
    token, role = authenticate()
    if not token or role != 'admin':
        print("Accès refusé. Seul un administrateur peut gérer les utilisateurs.")
        return
    while True:
        print("\n--- Menu Gestion Utilisateurs ---")
        print("1. Lister les utilisateurs")
        print("2. Ajouter un utilisateur")
        print("3. Modifier un utilisateur")
        print("4. Supprimer un utilisateur")
        print("5. Quitter")
        choice = input("Choix: ")
        if choice == '1':
            getUsers(token)
        elif choice == '2':
            add_user(token)
        elif choice == '3':
            modify_user(token)
        elif choice == '4':
            delete_user(token)
        elif choice == '5':
            break
        else:
            print("Choix invalide.")

if __name__ == "__main__":
    main()
try:
    print("\n📋 Utilisateurs existants :")
    users = client.service.getUsers(token=token)
    print(users)
except Exception as e:
    print("❌ Erreur getUsers :", e)

# Ajouter un utilisateur
print("\n➕ Création d’un nouvel utilisateur...")
try:
    res = client.service.addUser(
        token=token,
        name="TestUser",
        email="testuser@example.com",
        password="test123",
        role="editeur"
    )
    print("✅ Utilisateur ajouté :", res)
except Exception as e:
    print("❌ Erreur addUser :", e)
