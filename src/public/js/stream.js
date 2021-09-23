

// Captura de elementos del Dom
const canvas = document.getElementById('preview');
const buttonEmit = document.getElementById('btn');
const video = document.getElementById('video');
const statusVideo = document.querySelector('#status');

// Obtenemos la imagen del canvas
const context = canvas.getContext('2d');
context.width = canvas.width;
context.height = canvas.height;

const socket = io();    
canvas.style.display = 'none';

function postMessage(message) {
    message 
    ? statusVideo.innerText = message
    : statusVideo.innerText = 'Camara apagada';
}

function loadCamara(stream) {
    video.srcObject = stream;
    postMessage('Camara encendida');
}

function errorCamara() {
    postMessage('Error al iniciar la camara');
}

function verVideo(video, context) {
    context.drawImage(video, 0, 0, context.width, context.height);
    socket.emit('stream', canvas.toDataURL('image/webp'));
}

buttonEmit.addEventListener('click', () => {
    navigator.getUserMedia = (
        navigator.getUserMedia || navigator.webkitGetUserMedia || 
        navigator.mozGetUserMedia || navigator.msgGetUserMedia
    );
    navigator.getUserMedia
        ? navigator.getUserMedia({video: true}, loadCamara, errorCamara)
        : false;
    setInterval(() => {
        verVideo(video, context);
    }, 30);
});