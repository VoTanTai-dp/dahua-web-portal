const streamService = require('../services/stream.service');

async function healthCheck(req, res) {
  res.json({ status: 'Backend API OK' });
}

async function startStream(req, res) {
  try {
    const { username, password, ip, port } = req.body;

    if (!username || !password || !ip || !port) {
      return res.status(400).json({ error: 'Thiếu thông tin kết nối camera.' });
    }

    const rtspUrl = `rtsp://${username}:${encodeURIComponent(password)}@${ip}:${port}/cam/realmonitor?channel=1&subtype=0`;
    console.log(`Received RTSP URL: ${rtspUrl}`);

    await streamService.startStreaming(rtspUrl);

    res.json({ message: 'Đã khởi động stream WebSocket.', url: rtspUrl });
  } catch (err) {
    console.error('Start stream error:', err);
    res.status(500).json({ error: 'Start stream failed.' });
  }
}

async function stopStream(req, res) {
  try {
    await streamService.stopStreaming();
    res.json({ message: 'Stopped stream.' });
  } catch (err) {
    console.error('Stop stream error:', err);
    res.status(500).json({ error: 'Stop stream failed.' });
  }
}

module.exports = { healthCheck, startStream, stopStream };
