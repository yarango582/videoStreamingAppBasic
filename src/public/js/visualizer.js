
const socket = io();

socket.on('stream', (image) => {
    const img = document.getElementById('play');
    img.src = image;
});