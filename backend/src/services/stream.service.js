const WebSocket = require('ws');
const { spawn } = require('child_process');
const config = require('../config/stream.config');

let wss = null;
let ffmpegProcess = null;

function initWebSocketServer() {
  if (!wss) {
    wss = new WebSocket.Server({ port: config.wsPort });
    console.log(`MJPEG WebSocket server chạy tại ws://localhost:${config.wsPort}`);

    wss.on('connection', (ws) => {
      console.log('WebSocket client connected');
    });
  }
}

async function startStreaming(rtspUrl) {
  return new Promise((resolve) => {
    if (!wss) {
      console.log('WebSocket server chưa khởi động, init lại...');
      initWebSocketServer();
    }

    if (ffmpegProcess) {
      ffmpegProcess.kill('SIGINT');
      ffmpegProcess = null;
      console.log('Stopped old ffmpeg stream.');
    }

    console.log('Starting new stream:', rtspUrl);

    ffmpegProcess = spawn('ffmpeg', [
      '-i', rtspUrl,
      '-f', 'mjpeg',
      '-pix_fmt', 'yuvj420p',               // dòng này cho chuẩn MJPEG browser-friendly
      '-q:v', config.jpegQuality,
      '-vf', `scale=${config.videoScale}`,
      '-fflags', 'nobuffer',
      '-analyzeduration', '0',
      '-probesize', '32',
      '-'
    ]);

    ffmpegProcess.stdout.on('data', (data) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    ffmpegProcess.stderr.on('data', (data) => {
      console.log(`FFmpeg log: ${data}`);
    });

    ffmpegProcess.on('exit', () => {
      console.log('ffmpeg process exited.');
    });

    resolve();
  });
}

async function stopStreaming() {
  return new Promise((resolve) => {
    if (ffmpegProcess) {
      ffmpegProcess.kill('SIGINT');
      ffmpegProcess = null;
      console.log('Stopped ffmpeg stream.');
    }

    if (wss) {
      wss.close(() => {
        console.log('Closed WebSocket server.');
        wss = null;
        resolve();
      });
    } else {
      resolve();
    }
  });
}

module.exports = { initWebSocketServer, startStreaming, stopStreaming };
