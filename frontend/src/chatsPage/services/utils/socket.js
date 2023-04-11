// const socket = new WebSocket(`ws://localhost:8000/ws/${sender_username}/${receiver_username}/`);
// socket.onopen = (event) => {
//   console.log('WebSocket connection established.');
// };

// socket.onmessage = (event) => {
//   console.log('Received message:', event.data);
//   // You can update your UI here with the received message
// };

// socket.onclose = (event) => {
//   console.log('WebSocket connection closed.');
// };

// socket.onerror = (event) => {
//   console.error('WebSocket error:', event);
// };

// function sendMessage(message) {
//   const data = {
//     message: message
//   };
//   socket.send(JSON.stringify(data));
// }

// export { sendMessage };
