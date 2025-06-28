const WebSocket = require('ws');
const { spawn } = require('child_process');
const config = require('../config/stream.config');

let wss = null;
let ffmpegProcess = null;

function initWebSocketServer() {
  if (!wss) {
    wss = new WebSocket.Server({ port: config.wsPort }, () => {
      console.log(`>>>>>>>>>> MJPEG WebSocket server running at ws://localhost:${config.wsPort}`);
    });

    wss.on('connection', (ws) => {
      console.log('>>>>>>>>>> Stream WebSocket client connected');
    });

    wss.on('close', () => {
      console.log('>>>>>>>>>> MJPEG WebSocket server closed');
    });
  }
}

async function startStreaming(rtspUrl) {
  return new Promise((resolve, reject) => {
    try {
      if (!wss) {
        console.log('>>>>>>>>>> WebSocket server not started, init again...');
        initWebSocketServer();
      }

      if (ffmpegProcess) {
        console.log('>>>>>>>>>> Stop old stream...');
        ffmpegProcess.kill('SIGINT');
        ffmpegProcess = null;
      }

      console.log('>>>>>>>>>> Starting new stream:', rtspUrl);

      ffmpegProcess = spawn('ffmpeg', [
        '-rtsp_transport', 'tcp',
        '-i', rtspUrl,
        '-f', 'image2pipe',
        '-vcodec', 'mjpeg',
        '-pix_fmt', 'yuvj420p',
        '-q:v', config.jpegQuality,
        '-vf', `scale=${config.videoScale}`,
        '-fflags', 'nobuffer',
        '-analyzeduration', '0',
        '-probesize', '32',
        '-'
      ]);

      let buffer = Buffer.alloc(0);

      ffmpegProcess.stdout.on('data', (data) => {
        buffer = Buffer.concat([buffer, data]);

        let marker;
        while ((marker = buffer.indexOf(Buffer.from([0xFF, 0xD9]))) !== -1) {
          const frameBuffer = buffer.slice(0, marker + 2);
          buffer = buffer.slice(marker + 2);

          const base64Image = frameBuffer.toString('base64');
          const message = JSON.stringify({ type: 'frame', data: base64Image });

          // CHECK wss before accessing
          if (wss) {
            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(message);
              }
            });
          }
        }
      });

      ffmpegProcess.stderr.on('data', (data) => {
        console.log(`FFmpeg log: ${data.toString()}`);
      });

      ffmpegProcess.on('close', (code, signal) => {
        console.log(`FFmpeg exited with code ${code} (signal: ${signal})`);
      });

      resolve();
    } catch (err) {
      console.error('>>>>>>>>>> startStreaming error:', err);
      reject(err);
    }
  });
}

function stopStreaming() {
  return new Promise((resolve) => {
    if (ffmpegProcess) {
      ffmpegProcess.kill('SIGINT');
      ffmpegProcess = null;
      console.log('>>>>>>>>>> Stopped FFmpeg stream');
    }

    if (wss) {
      wss.close(() => {
        console.log('>>>>>>>>>> WebSocket stream server closed');
        wss = null;
        resolve();
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  initWebSocketServer,
  startStreaming,
  stopStreaming
};
