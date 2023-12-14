const socket = io();

let username = null

while (username == null) {
    username = prompt('Entrer un nom :');
}

socket.emit('setUsername', username);

socket.on('user_connected', (data) => {
    const item = document.createElement('li');
    const infoElement = document.createElement('p');

    item.classList.add('connect');

    infoElement.textContent = `${data.username} ${data.message}`;

    item.appendChild(infoElement);

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user_disconnected', (data) => {
    const item = document.createElement('li');
    const infoElement = document.createElement('p');

    item.classList.add('disconnect');

    infoElement.textContent = `${data.username} ${data.message}`;

    item.appendChild(infoElement);

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('user_message', { message: input.value });
        input.value = '';
    }
});

socket.on('user_message', (data) => {
    const item = document.createElement('li');
    const usernameElement = document.createElement('p');
    const messageElement = document.createElement('p');

    if (data.username == username) {        
        item.classList.add('currentUserMessage');        
    }

    usernameElement.textContent = data.username;
    messageElement.textContent = data.message;

    item.appendChild(usernameElement);
    item.appendChild(messageElement);

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
