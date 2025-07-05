const express = require('express');
const cors = require('cors');
const streamRoutes = require('./routes/stream.route');
const streamService = require('./services/stream.service');
const dbRoutes = require('./routes/database.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', streamRoutes);
app.use('/api/database', dbRoutes);

// streamService.startStreaming();

module.exports = app;
