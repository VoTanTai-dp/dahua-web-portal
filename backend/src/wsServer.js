const WebSocket = require('ws');
const counterService = require('./services/counter.service');

const wss = new WebSocket.Server({ port: 9997 }, () => {
  console.log('Stream WebSocket server chạy tại ws://localhost:9997');
});

wss.on('connection', (ws) => {
  console.log('Stream WebSocket client connected');

  counterService.attachSocket(ws);
});
