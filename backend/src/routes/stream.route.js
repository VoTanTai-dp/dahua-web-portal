const express = require('express')
const router = express.Router()
const streamController = require('../controllers/stream.controller')
const streamService = require('../services/stream.service')

router.get('/ping', streamController.healthCheck)

router.post('/start-stream', streamController.startStream)

router.post('/stop-stream', (req, res) => {
  streamService.stopStreaming()
  res.json({ message: 'Stopped stream.' })
})

module.exports = router
