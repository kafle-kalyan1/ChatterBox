const socket = new WebSocket(`ws://localhost:8000/ws/`);

function onMessageReceived(callback) {
  socket.onmessage = (event) => {
    callback(event.data);
  };
}

function sendMessage(message) {
  socket.send(JSON.stringify(message));
}

export { sendMessage, onMessageReceived };
