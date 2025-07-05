const streamService = require('../services/stream.service');
const counterService = require('../services/counter.service');
const sensorController = require('./sensor.controller'); //
const db = require('../services/db.service'); // Kết nối DB

let currentSessionId = null; // Session đang chạy hiện tại

async function healthCheck(req, res) {
  res.json({ status: '>>>>>>>>>> Backend API OK' });
}

async function startStream(req, res) {
  try {
    const { username, password, ip, port } = req.body;

    if (!username || !password || !ip || !port) {
      return res.status(400).json({ error: '>>>>>>>>>> Missing camera connection information' });
    }

    const rtspUrl = `rtsp://${username}:${encodeURIComponent(password)}@${ip}:${port}/cam/realmonitor?channel=1&subtype=0`;
    console.log(`>>>>>>>>>> Received RTSP URL: ${rtspUrl}`);

    // Start stream
    await streamService.startStreaming(rtspUrl);

    // Ghi nhận thiết bị nếu chưa có
    const deviceId = await db.upsertDevice({ username, password, ip, port });

    // Tạo session mới
    currentSessionId = await db.createSession(deviceId);

    // Truyền sessionId cho cả 2 service
    counterService.setSessionId(currentSessionId);
    sensorController.setSessionId(currentSessionId); 

    // Bắt đầu đếm
    counterService.startCounting({ username, password, ip });

    res.json({ message: '>>>>>>>>>> Stream and counting service started', url: rtspUrl });

  } catch (err) {
    console.error('>>>>>>>>>> Start stream error:', err);
    res.status(500).json({ error: '>>>>>>>>>> Start stream failed' });
  }
}

async function stopStream(req, res) {
  try {
    await streamService.stopStreaming();
    counterService.stopCounting();

    if (currentSessionId) {
      await db.endSession(currentSessionId);
      currentSessionId = null;
    }

    res.json({ message: '>>>>>>>>>> Stopped streaming and counting service' });
  } catch (err) {
    console.error('>>>>>>>>>> Stop stream error:', err);
    res.status(500).json({ error: '>>>>>>>>>> Stop stream failed' });
  }
}

module.exports = { healthCheck, startStream, stopStream };
