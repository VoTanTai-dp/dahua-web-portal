function healthCheck(req, res) {
  res.json({ status: 'Backend API OK ✅' });
}

module.exports = { healthCheck };
