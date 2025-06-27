const WebSocket = require('ws');
const JSON5 = require('json5');

let countWsServer;
let count = { Human: 0, Vehicle: 0 };

async function startCounting({ username, password, ip }) {
  console.log('Đã khởi động count service');

  if (!countWsServer) {
    countWsServer = new WebSocket.Server({ port: 9998 }, () => {
      console.log('Count WebSocket server chạy tại ws://localhost:9998');
    });
  }

  const { default: DigestFetch } = await import('digest-fetch');
  const client = new DigestFetch(username, password);
  const urlPath = `/cgi-bin/eventManager.cgi?action=attach&codes=[CrossLineDetection]`;

  const connectEventStream = () => {
    client.fetch(`http://${ip}${urlPath}`)
      .then(res => {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        const read = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log('Event stream closed — reconnecting in 3s...');
              setTimeout(connectEventStream, 3000);
              return;
            }

            const str = decoder.decode(value);
            const lines = str.split('--myboundary');  // tách từng event block

            lines.forEach(line => {
              if (line.includes('Code=CrossLineDetection') && line.includes('data=')) {
                const match = line.match(/data=({[\s\S]*})/);  // bắt cả xuống dòng
                if (match) {
                  const dataStr = match[1];
                  try {
                    const dataObj = JSON5.parse(dataStr);

                    if (dataObj.Object?.ObjectType === 'Human') count.Human++;
                    if (dataObj.Object?.ObjectType === 'Vehicle') count.Vehicle++;

                    console.log(`✅ Human: ${count.Human}, Vehicle: ${count.Vehicle}`);

                    countWsServer.clients.forEach(client => {
                      if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                          type: 'count',
                          data: count
                        }));
                      }
                    });

                  } catch (err) {
                    console.error('❌ JSON parse error:', err.message);
                    console.log('Raw data causing error:', dataStr);
                  }
                }
              }
            });

            read();
          }).catch(err => {
            console.error('Read stream error:', err);
            setTimeout(connectEventStream, 3000);
          });
        };

        read();
      })
      .catch(err => {
        console.error('Fetch event stream failed:', err);
        setTimeout(connectEventStream, 3000);
      });
  };

  connectEventStream();
}

function stopCounting() {
  if (countWsServer) {
    countWsServer.close(() => {
      console.log('Đã dừng Count WebSocket server.');
      countWsServer = null;
    });
  }
  count = { Human: 0, Vehicle: 0 };
}

module.exports = { startCounting, stopCounting };
