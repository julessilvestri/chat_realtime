const socket = io();

// Demandez à l'utilisateur de fournir un nom
const username = prompt('Entrer un nom :');
socket.emit('setUsername', username);

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', { message: input.value });
        input.value = '';
    }
});

socket.on('chat message', (data) => {
    const item = document.createElement('ul');
    const usernameElement = document.createElement('p');
    const messageElement = document.createElement('li');

    usernameElement.textContent = data.username;
    messageElement.textContent = data.message;

    item.appendChild(usernameElement);
    item.appendChild(messageElement);

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});