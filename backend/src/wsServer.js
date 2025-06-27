// const WebSocket = require('ws');
// const counterService = require('./services/counter.service');

// function startCountSocketServer(port) {
//   const wss = new WebSocket.Server({ port }, () => {
//     console.log(`Count WebSocket server listener tại ws://localhost:${port}`);
//   });

//   wss.on('connection', (ws) => {
//     console.log('WebSocket count client connected');
//     counterService.attachSocket(ws);
//   });
// }

// module.exports = { startCountSocketServer };
