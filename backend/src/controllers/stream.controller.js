const WebSocket = require('ws');
const { spawn } = require('child_process');
const config = require('../config/stream.config');

function startStreaming() {
  const wss = new WebSocket.Server({ port: config.wsPort });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    const ffmpeg = spawn('ffmpeg', [
      '-i', config.rtspUrl,
      '-f', 'mjpeg',
      '-q:v', config.jpegQuality,
      '-vf', `scale=${config.videoScale}`,
      '-fflags', 'nobuffer',
      '-analyzeduration', '0',
      '-probesize', '32',
      '-'
    ]);

    ffmpeg.stdout.on('data', (data) => {
      ws.send(data);
    });

    ffmpeg.stderr.on('data', (data) => {
      console.log(`FFmpeg log: ${data}`);
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
      ffmpeg.kill('SIGINT');
    });
  });

  console.log(`WebSocket MJPEG server running at ws://localhost:${config.wsPort}`);
}

module.exports = { startStreaming };
