const express = require('express');
const router = express.Router();
const streamController = require('../controllers/stream.controller');

router.get('/', streamController.getStreamPage);

module.exports = router;
