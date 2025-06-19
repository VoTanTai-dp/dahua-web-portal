const WebSocket = require('ws')
const { spawn } = require('child_process')
const config = require('../config/stream.config')

let wss = null
let ffmpegProcess = null

function initWebSocketServer() {
  if (!wss) {
    wss = new WebSocket.Server({ port: config.wsPort })
    console.log(`MJPEG WebSocket server chạy tại ws://localhost:${config.wsPort}`)

    wss.on('connection', (ws) => {
      console.log('WebSocket client connected')
    })
  }
}

function startStreaming(rtspUrl) {
  if (!wss) {
    console.log('WebSocket server chưa khởi động, init lại...')
    initWebSocketServer()
  }

  // Stop stream cũ nếu có
  if (ffmpegProcess) {
    ffmpegProcess.kill('SIGINT')
    ffmpegProcess = null
    console.log('Stopped old ffmpeg stream.')
  }

  console.log('Starting new stream:', rtspUrl)

  ffmpegProcess = spawn('ffmpeg', [
    '-i', rtspUrl,
    '-f', 'mjpeg',
    '-q:v', config.jpegQuality,
    '-vf', `scale=${config.videoScale}`,
    '-fflags', 'nobuffer',
    '-analyzeduration', '0',
    '-probesize', '32',
    '-'
  ])

  ffmpegProcess.stdout.on('data', (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })

  ffmpegProcess.stderr.on('data', (data) => {
    console.log(`FFmpeg log: ${data}`)
  })

  ffmpegProcess.on('exit', () => {
    console.log('ffmpeg process exited.')
  })
}

function stopStreaming() {
  if (ffmpegProcess) {
    ffmpegProcess.kill('SIGINT')
    ffmpegProcess = null
    console.log('Stopped ffmpeg stream.')
  }

  if (wss) {
    wss.close(() => {
      console.log('Closed WebSocket server.')
    })
    wss = null
  }
}

module.exports = { initWebSocketServer, startStreaming, stopStreaming }
