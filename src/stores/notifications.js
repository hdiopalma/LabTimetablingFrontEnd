const chatSocket = new WebSocket(import.meta.env.VITE_WS_HOST + 'notification/');

chatSocket.onopen = function() {
  console.log('WebSocket connection established.');
  const message = {
    'message': 'Hello, world!'
  };
  // chatSocket.send(JSON.stringify(message));
};

chatSocket.onmessage = function(event) {
  // Parse the data
  const message = JSON.parse(event.data);
  console.log('Received message:', message);
};

chatSocket.onclose = function(event) {
  console.log('WebSocket connection closed:', event);
};