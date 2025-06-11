const express = require('express');
const cors = require('cors');
const streamRoutes = require('./routes/stream.route');
const streamService = require('./services/stream.service');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// API routes
app.use('/api', streamRoutes);

// Start WebSocket MJPEG streaming
streamService.startStreaming();

module.exports = app;