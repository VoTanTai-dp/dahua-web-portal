const express = require('express');
const router = express.Router();
const streamController = require('../controllers/stream.controller');

router.get('/ping', streamController.healthCheck);
router.post('/start-stream', streamController.startStream);

module.exports = router;
