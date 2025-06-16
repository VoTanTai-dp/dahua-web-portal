const WebSocket = require('ws')
const { spawn } = require('child_process')
const config = require('../config/stream.config')

let wss = null
let currentRtspUrl = null

function initWebSocketServer() {
  if (!wss) {
    wss = new WebSocket.Server({ port: config.wsPort })
    console.log(`✅ MJPEG WebSocket server chạy tại ws://localhost:${config.wsPort}`)

    wss.on('connection', (ws) => {
      console.log('✅ WebSocket client connected')

      // Kiểm tra nếu chưa có RTSP URL thì đóng kết nối ngay
      if (!currentRtspUrl) {
        console.log('⚠️ Chưa có RTSP URL, closing connection')
        ws.close()
        return
      }

      const ffmpeg = spawn('ffmpeg', [
        '-i', currentRtspUrl,
        '-f', 'mjpeg',
        '-q:v', config.jpegQuality,
        '-vf', `scale=${config.videoScale}`,
        '-fflags', 'nobuffer',
        '-analyzeduration', '0',
        '-probesize', '32',
        '-'
      ])

      ffmpeg.stdout.on('data', (data) => {
        ws.send(data)
      })

      ffmpeg.stderr.on('data', (data) => {
        console.log(`FFmpeg log: ${data}`)
      })

      ws.on('close', () => {
        console.log('❌ WebSocket client disconnected')
        ffmpeg.kill('SIGINT')
      })
    })
  }
}

function startStreaming(rtspUrl) {
  if (!wss) {
    initWebSocketServer()
  }
  currentRtspUrl = rtspUrl
  console.log(`📡 RTSP URL mới nhận: ${currentRtspUrl}`)
}

module.exports = { startStreaming }
