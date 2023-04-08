const ws = new WebSocket("ws://localhost:8000/ws/ac/");

ws.onopen = (event) => {
  console.log("WebSocket connection established.");
};

ws.onmessage = (event) => {
  console.log("Received message:", event.data);
};

ws.onclose = (event) => {
  console.log("WebSocket connection closed.");
};

ws.onerror = (event) => {
  console.error("WebSocket error:", event);
};

function sendMessage(data) {
  ws.send(JSON.stringify(data));
}

export { sendMessage };
