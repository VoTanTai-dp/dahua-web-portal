require('dotenv').config();
const app = require('./src/app');
const sensorController = require('./src/controllers/sensor.controller');
const axios = require('axios');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// Load từ .env
const haToken = process.env.HA_TOKEN;
const haHost = process.env.HA_HOST || 'http://localhost:8123';
const deviceTemp = process.env.HA_DEVICE_TEMP || 'sensor.sonoff_100170f83e_temperature';
const deviceHum = process.env.HA_DEVICE_HUM || 'sensor.sonoff_100170f83e_humidity';

sensorController.sensorSocketServer(); // Khởi động WebSocket sensor

setInterval(async () => {
  try {
    const [tempRes, humRes] = await Promise.all([
      axios.get(`${haHost}/api/states/${deviceTemp}`, {
        headers: { Authorization: `Bearer ${haToken}` }
      }),
      axios.get(`${haHost}/api/states/${deviceHum}`, {
        headers: { Authorization: `Bearer ${haToken}` }
      })
    ]);

    const temperature = parseFloat(tempRes.data.state);
    const humidity = parseFloat(humRes.data.state);

    sensorController.broadcastSensor({ temperature, humidity });
  } catch (err) {
    console.error('>>>>>>>>>> Lỗi lấy dữ liệu Home Assistant:', err.message);
  }
}, 5000); // 5s cập nhật 1 lần