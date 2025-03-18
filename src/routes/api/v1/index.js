const express = require('express');
const router = express.Router();

const AirplaneRoutes = require('./airplane.routes.js');
const CityRoutes = require('./city.routes.js');
const AirportRoutes = require('./airport.routes.js');

router.use('/airplane', AirplaneRoutes);
router.use('/city', CityRoutes);
router.use('/airport', AirportRoutes);

module.exports = router;
