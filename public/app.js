const socket = io();
let currentUser = '';
let currentChat = null;

// Éléments DOM
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const usersList = document.getElementById('users-list');
const groupsList = document.getElementById('groups-list');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const chatHeader = document.getElementById('chat-header');
const createGroupBtn = document.getElementById('create-group-btn');

// Rejoindre le chat
joinBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        socket.emit('user-join', username);
        loginScreen.style.display = 'none';
        mainScreen.style.display = 'flex';
    }
});

// Envoyer un message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message && currentChat) {
        socket.emit('private-message', {
            to: currentChat,
            message: message,
            from: currentUser
        });
        displayMessage(currentUser, message, true);
        messageInput.value = '';
    }
}

// Afficher un message
function displayMessage(sender, message, isSent) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

// Mise à jour de la liste des utilisateurs
socket.on('users-update', (users) => {
    usersList.innerHTML = '';
    users.forEach(user => {
        if (user !== currentUser) {
            const li = document.createElement('li');
            li.textContent = user;
            li.addEventListener('click', () => openPrivateChat(user));
            usersList.appendChild(li);
        }
    });
});

// Ouvrir un chat privé
function openPrivateChat(username) {
    currentChat = username;
    chatHeader.textContent = `Chat avec ${username}`;
    messages.innerHTML = '';
}

// Recevoir un message privé
socket.on('private-message', (data) => {
    if (currentChat === data.from) {
        displayMessage(data.from, data.message, false);
    }
});

// Créer un groupe
createGroupBtn.addEventListener('click', () => {
    const groupName = prompt('Nom du groupe:');
    if (groupName) {
        socket.emit('create-group', groupName);
    }
});

// Mise à jour de la liste des groupes
socket.on('groups-update', (groups) => {
    groupsList.innerHTML = '';
    groups.forEach(group => {
        const li = document.createElement('li');
        li.textContent = group;
        li.addEventListener('click', () => openGroupChat(group));
        groupsList.appendChild(li);
    });
});

// Ouvrir un chat de groupe
function openGroupChat(groupName) {
    currentChat = `group:${groupName}`;
    chatHeader.textContent = `Groupe: ${groupName}`;
    messages.innerHTML = '';
    socket.emit('join-group', groupName);
}
