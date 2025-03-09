const express = require('express');
const router = express.Router();

const AirplaneRoutes = require('./airplane.routes.js');

router.use('/airplane', AirplaneRoutes);

module.exports = router;
