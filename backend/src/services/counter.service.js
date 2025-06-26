const WebSocket = require('ws');

let countWsServer;
let count = {
  Human: 0,
  Vehicle: 0
};

let DigestFetch; // declare global var

async function startCounting({ username, password, ip }) {
  console.log('Đã khởi động count service');

  countWsServer = new WebSocket.Server({ port: 9998 }, () => {
    console.log('Count WebSocket server chạy tại ws://localhost:9998');
  });

  // Dynamic import digest-fetch
  DigestFetch = (await import('digest-fetch')).default;

  const client = new DigestFetch(username, password);

  const url = `http://${username}:${encodeURIComponent(password)}@${ip}/cgi-bin/eventManager.cgi?action=attach&codes=[CrossLineDetection]`;
  console.log('Connect event URL:', url);

  const res = await client.fetch(url, { method: 'GET' });

  res.body.on('data', (chunk) => {
    const str = chunk.toString();
    if (str.includes('Code=CrossLineDetection') && str.includes('data=')) {
      const match = str.match(/data=({.*})/);
      if (match) {
        try {
          const dataObj = JSON.parse(match[1]);
          if (dataObj.Object.ObjectType === 'Human') count.Human++;
          if (dataObj.Object.ObjectType === 'Vehicle') count.Vehicle++;

          console.log(`Đã đếm: Human ${count.Human}, Vehicle ${count.Vehicle}`);

          // Gửi về tất cả client
          countWsServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(count));
            }
          });
        } catch (e) {
          console.error('Parse JSON error:', e);
        }
      }
    }
  });

  res.body.on('error', (err) => {
    console.error('Event stream error:', err);
  });
}

function stopCounting() {
  if (countWsServer) {
    countWsServer.close(() => {
      console.log('Đã dừng Count WebSocket server.');
    });
  }
}

function attachSocket(ws) {
  if (countWsServer) {
    countWsServer.emit('connection', ws);
  }
}

module.exports = { startCounting, stopCounting, attachSocket };
