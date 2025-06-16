const streamService = require('../services/stream.service');

function healthCheck(req, res) {
  res.json({ status: 'Backend API OK' });
}

function startStream(req, res) {
  const { username, password, ip, port } = req.body;

  if (!username || !password || !ip || !port) {
    return res.status(400).json({ error: 'Thiếu thông tin kết nối camera.' });
  }

  const rtspUrl = `rtsp://${username}:${encodeURIComponent(password)}@${ip}:${port}/cam/realmonitor?channel=1&subtype=0`;
  console.log(`Received RTSP URL: ${rtspUrl}`);
  streamService.startStreaming(rtspUrl);

  res.json({ message: 'Đã khởi động stream WebSocket.', url: rtspUrl });
}

module.exports = { healthCheck, startStream };
