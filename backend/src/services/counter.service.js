const WebSocket = require('ws');
const JSON5 = require('json5');

let countWsServer;
let count = { Human: 0, Vehicle: 0 };
let shouldReconnect = true;

async function startCounting({ username, password, ip }) {
  console.log('>>>>>>>>>> Count service started');

  if (!countWsServer) {
    countWsServer = new WebSocket.Server({ port: 9998 }, () => {
      console.log('>>>>>>>>>> Count WebSocket server running at ws://localhost:9998');
    });
  }

  const { default: DigestFetch } = await import('digest-fetch');
  const client = new DigestFetch(username, password);
  const urlPath = `/cgi-bin/eventManager.cgi?action=attach&codes=[CrossLineDetection]`;

  const connectEventStream = () => {
    if (!shouldReconnect) return;

    client.fetch(`http://${ip}${urlPath}`)
      .then(res => {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        const read = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log('>>>>>>>>>> Event stream closed — reconnecting in 3s...');
              if (shouldReconnect) setTimeout(connectEventStream, 3000);
              return;
            }

            const str = decoder.decode(value);
            const lines = str.split('--myboundary');

            lines.forEach(line => {
              if (
                line.includes('Code=CrossLineDetection') &&
                line.includes('data=') &&
                line.includes('action=Start') // chỉ đếm khi action=Start
              ) {
                const match = line.match(/data=({[\s\S]*})/);
                if (match) {
                  const dataStr = match[1];
                  try {
                    const dataObj = JSON5.parse(dataStr);

                    if (dataObj.Object?.ObjectType === 'Human') count.Human++;
                    if (dataObj.Object?.ObjectType === 'Vehicle') count.Vehicle++;

                    console.log(`>>>>>>>>>> Human: ${count.Human}, Vehicle: ${count.Vehicle}`);

                    if (countWsServer && countWsServer.clients) {
                      countWsServer.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                          client.send(JSON.stringify({
                            type: 'count',
                            data: count
                          }));
                        }
                      });
                    }

                  } catch (err) {
                    console.error('>>>>>>>>>> JSON parse error:', err.message);
                    console.log('>>>>>>>>>> Raw data causing error:', dataStr);
                  }
                }
              }
            });

            read();
          }).catch(err => {
            console.error('>>>>>>>>>> Read stream error:', err);
            if (shouldReconnect) setTimeout(connectEventStream, 3000);
          });
        };

        read();
      })
      .catch(err => {
        console.error('>>>>>>>>>> Fetch event stream failed:', err);
        if (shouldReconnect) setTimeout(connectEventStream, 3000);
      });
  };

  shouldReconnect = true;
  connectEventStream();
}

function stopCounting() {
  shouldReconnect = false;
  if (countWsServer) {
    countWsServer.close(() => {
      console.log('>>>>>>>>>> Count WebSocket server stopped');
      countWsServer = null;
    });
  }
  count = { Human: 0, Vehicle: 0 }; // reset count về 0 khi stop
  console.log(">>>>>>>>>> Check count: ", count)
}

module.exports = { startCounting, stopCounting };
