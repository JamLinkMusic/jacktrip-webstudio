// Simple WebSocket signaling server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // Broadcast message to all other clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected to JackTrip Signaling Server' }));
});

console.log('WebSocket server running on ws://localhost:3001');