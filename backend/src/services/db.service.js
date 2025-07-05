// backend/src/services/db.service.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');

async function findDevice(ip, port) {
  const [rows] = await pool.query('SELECT * FROM devices WHERE ip=? AND port=?', [ip, port]);
  return rows[0];
}

async function upsertDevice({ username, password, ip, port }) {
  const hashed = await bcrypt.hash(password, 10);
  const existing = await findDevice(ip, port);
  if (existing) {
    await pool.query('UPDATE devices SET username=?, password=? WHERE id=?', [username, hashed, existing.id]);
    return existing.id;
  } else {
    const [res] = await pool.query(
      'INSERT INTO devices(username,password,ip,port) VALUES(?,?,?,?)',
      [username, hashed, ip, port]
    );
    return res.insertId;
  }
}

async function createSession(deviceId) {
  const [res] = await pool.query(
    'INSERT INTO sessions(device_id, start_time) VALUES(?, NOW())',
    [deviceId]
  );
  return res.insertId;
}

async function endSession(sessionId) {
  await pool.query('UPDATE sessions SET end_time=NOW() WHERE id=?', [sessionId]);
}

async function logSensorData(sessionId, temperature, humidity) {
  await pool.query(
    'INSERT INTO sensor_data(session_id, temperature, humidity) VALUES(?,?,?)',
    [sessionId, temperature, humidity]
  );
}

async function logCount(sessionId, human, vehicle) {
  await pool.query(
    'INSERT INTO session_counts(session_id, human_count, vehicle_count) VALUES(?,?,?)',
    [sessionId, human, vehicle]
  );
}

async function getAllTables() {
  const [devices] = await pool.query('SELECT id, username, ip, port, created_at FROM devices');
  const [sessions] = await pool.query('SELECT * FROM sessions');
  const [session_counts] = await pool.query('SELECT * FROM session_counts');
  const [sensor_data] = await pool.query('SELECT * FROM sensor_data');
  return { devices, sessions, session_counts, sensor_data };
}

module.exports = {
  upsertDevice, findDevice,
  createSession, endSession,
  logSensorData, logCount,
  getAllTables,
};
