const ws = new WebSocket('ws://localhost:8000/ws/sc');

ws.onopen = (event) => {
  console.log('WebSocket connection established.');
  ws.send('Hello, world!');  
};

ws.onmessage = (event) => {
  console.log(event.data);
};

ws.onclose = (event) => {
  console.log('WebSocket connection closed.');
};

ws.onerror = (event) => {
  console.error('WebSocket error:', event);
};
