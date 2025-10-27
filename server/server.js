const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, '../public')));

// Stocker les utilisateurs et groupes
const users = new Map(); // socketId -> username
const groups = new Map(); // groupName -> Set of socketIds

io.on('connection', (socket) => {
    console.log('Nouvelle connexion:', socket.id);

    // Utilisateur rejoint le chat
    socket.on('user-join', (username) => {
        users.set(socket.id, username);
        console.log(`${username} a rejoint le chat`);
        
        // Envoyer la liste des utilisateurs à tous
        io.emit('users-update', Array.from(users.values()));
    });

    // Message privé
    socket.on('private-message', (data) => {
        const recipientSocketId = Array.from(users.entries())
            .find(([id, name]) => name === data.to)?.[0];
        
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('private-message', {
                from: data.from,
                message: data.message
            });
        }
    });

    // Créer un groupe
    socket.on('create-group', (groupName) => {
        if (!groups.has(groupName)) {
            groups.set(groupName, new Set());
            io.emit('groups-update', Array.from(groups.keys()));
            console.log(`Groupe créé: ${groupName}`);
        }
    });

    // Rejoindre un groupe
    socket.on('join-group', (groupName) => {
        if (groups.has(groupName)) {
            groups.get(groupName).add(socket.id);
            socket.join(groupName);
            console.log(`${users.get(socket.id)} a rejoint le groupe ${groupName}`);
        }
    });

    // Message de groupe
    socket.on('group-message', (data) => {
        io.to(data.groupName).emit('group-message', {
            from: users.get(socket.id),
            message: data.message,
            group: data.groupName
        });
    });

    // Déconnexion
    socket.on('disconnect', () => {
        const username = users.get(socket.id);
        users.delete(socket.id);
        
        // Retirer des groupes
        groups.forEach((members, groupName) => {
            members.delete(socket.id);
        });
        
        console.log(`${username} s'est déconnecté`);
        io.emit('users-update', Array.from(users.values()));
    });
});

server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
