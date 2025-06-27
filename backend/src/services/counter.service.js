const WebSocket = require('ws');

let countWsServer;
let count = {
  Human: 0,
  Vehicle: 0
};

let DigestFetch;

async function startCounting({ username, password, ip }) {
  console.log('Đã khởi động count service');

  if (countWsServer) {
    console.log('Count WebSocket server đã tồn tại — đóng lại...');
    countWsServer.close();
  }

  countWsServer = new WebSocket.Server({ port: 9998 }, () => {
    console.log('Count WebSocket server chạy tại ws://localhost:9998');
  });

  DigestFetch = (await import('digest-fetch')).default;
  const client = new DigestFetch(username, password);

  const url = `http://${ip}/cgi-bin/eventManager.cgi?action=attach&codes=[CrossLineDetection]`;
  console.log('Connect event URL:', url);

  try {
    const res = await client.fetch(url, { method: 'GET' });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    async function read() {
      try {
        const { done, value } = await reader.read();

        if (done) {
          console.log('Event stream closed by device.');
          return;
        }

        const str = decoder.decode(value);

        if (str.includes('Code=CrossLineDetection') && str.includes('data=')) {
          const match = str.match(/data=({.*})/);
          if (match) {
            try {
              const dataObj = JSON.parse(match[1]);
              if (dataObj.Object.ObjectType === 'Human') count.Human++;
              if (dataObj.Object.ObjectType === 'Vehicle') count.Vehicle++;

              console.log(`Đã đếm: Human ${count.Human}, Vehicle ${count.Vehicle}`);

              const message = JSON.stringify({
                type: 'count',
                data: count
              });

              countWsServer.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(message);
                }
              });
            } catch (e) {
              console.error('Parse JSON error:', e);
            }
          }
        }

        // Tiếp tục đọc
        read();
      } catch (err) {
        console.error('❌ Event stream read error:', err);
      }
    }

    read();

  } catch (err) {
    console.error('❌ Không kết nối được đến camera event stream:', err);
  }
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
