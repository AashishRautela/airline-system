const express = require('express');
const { FlightController } = require('../../../controllers');
const router = express.Router();

router.post('/', FlightController.createFlight);
router.get('/', FlightController.getAllFlights);
router.get('/:id', FlightController.getFlight);
router.patch('/:id/seats', FlightController.updateFlightSeats);

module.exports = router;
