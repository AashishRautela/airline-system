const express = require('express');
const router = express.Router();

const AirplaneRoutes = require('./airplane.routes.js');
const CityRoutes = require('./city.routes.js');
const AirportRoutes = require('./airport.routes.js');
const FLightRoutes = require('./flight.routes.js');
const SeatRoutes = require('./seat.routes.js');

router.use('/airplane', AirplaneRoutes);
router.use('/city', CityRoutes);
router.use('/airport', AirportRoutes);
router.use('/flight', FLightRoutes);
router.use('/seat', SeatRoutes);

module.exports = router;
