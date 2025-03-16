const express = require('express');
const router = express.Router();

const AirplaneRoutes = require('./airplane.routes.js');
const CityRoutes = require('./city.routes.js');

router.use('/airplane', AirplaneRoutes);
router.use('/city', CityRoutes);

module.exports = router;
