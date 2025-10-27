# SimpleChatApp

ce projet est une messagerie sociale simple, sans login, où les utilisateurs entrent juste leur nom, voient d'autres noms, envoient des messages privés et créent des groupes de discussion

## Structure du Projet

```
SimpleChatApp/
├── public/              # Frontend (HTML, CSS, JS)
│   ├── index.html      # Page principale
│   ├── styles.css      # Styles CSS
│   └── app.js          # Logique client
├── server/             # Backend Node.js
│   └── server.js       # Serveur Socket.IO
├── package.json        # Dépendances npm
└── README.md
```

## Fonctionnalités

- **Connexion sans authentification** : Les utilisateurs entrent simplement leur nom
- **Liste des utilisateurs en ligne** : Voir qui est connecté en temps réel
- **Messages privés** : Envoyer des messages directs à d'autres utilisateurs
- **Création de groupes** : Créer et rejoindre des groupes de discussion
- **Temps réel** : Communication instantanée via WebSocket (Socket.IO)

## Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

### Étapes

1. Cloner le répertoire :
```bash
git clone https://github.com/Doupidoux/SimpleChatApp.git
cd SimpleChatApp
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer le serveur :
```bash
npm start
```

4. Ouvrir votre navigateur et accéder à :
```
http://localhost:3000
```

## Développement

Pour le mode développement avec rechargement automatique :
```bash
npm run dev
```

## Technologies Utilisées

- **Frontend** : HTML5, CSS3, JavaScript vanilla
- **Backend** : Node.js, Express.js
- **Communication temps réel** : Socket.IO

## Utilisation

1. Entrez votre nom sur l'écran de connexion
2. Cliquez sur "Rejoindre" pour accéder au chat
3. Voir la liste des utilisateurs en ligne dans la barre latérale
4. Cliquer sur un utilisateur pour démarrer une conversation privée
5. Créer un groupe en cliquant sur "Créer un groupe"
6. Rejoindre un groupe en cliquant sur son nom dans la liste

## Licence

MIT
