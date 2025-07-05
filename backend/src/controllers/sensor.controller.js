const WebSocket = require('ws');
const db = require('../services/db.service'); // Dùng để log vào DB

let sensorClients = [];
let currentSessionId = null; // sessionId hiện tại

function setSessionId(id) {
  currentSessionId = id;
}

function sensorSocketServer() {
  const wss = new WebSocket.Server({ port: 9997 }, () => {
    console.log('>>>>>>>>>> Sensor WebSocket running at ws://localhost:9997');
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

  // Ghi sensor vào DB nếu có sessionId và giá trị hợp lệ
  if (
    currentSessionId &&
    typeof data.temperature === 'number' &&
    typeof data.humidity === 'number'
  ) {
    db.logSensorData(currentSessionId, data.temperature, data.humidity);
  }
}

module.exports = {
  sensorSocketServer,
  broadcastSensor,
  setSessionId // Export setter để controller stream truyền sessionId vào
};
