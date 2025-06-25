const express = require('express');
const router = express.Router();
const streamController = require('../controllers/stream.controller');

router.get('/ping', streamController.healthCheck);
router.post('/start-stream', streamController.startStream);
router.post('/stop-stream', streamController.stopStream);

module.exports = router;
