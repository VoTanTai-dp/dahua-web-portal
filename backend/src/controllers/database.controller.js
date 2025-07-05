const db = require('../services/db.service');

async function getAll(req, res) {
  try {
    const tables = await db.getAllTables();
    res.json(tables);
  } catch (err) {
    console.error('DB fetch error', err);
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
}

module.exports = { getAll };
