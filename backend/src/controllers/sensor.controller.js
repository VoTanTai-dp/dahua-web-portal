const WebSocket = require('ws');
let sensorClients = [];

function sensorSocketServer() {
  const wss = new WebSocket.Server({ port: 9997 }, () => {
    console.log('✅ Sensor WebSocket running at ws://localhost:9997');
  });

  wss.on('connection', (ws) => {
    console.log('Sensor client connected');
    sensorClients.push(ws);

    ws.on('close', () => {
      sensorClients = sensorClients.filter((c) => c !== ws);
    });
  });
}

function broadcastSensor(data) {
  sensorClients.forEach((ws) => {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({ type: 'sensor', data }));
    }
  });
}

module.exports = {
  sensorSocketServer,
  broadcastSensor
};
