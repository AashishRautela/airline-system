const express = require('express');
const { AirportController } = require('../../../controllers');
const router = express.Router();

router.post('/', AirportController.createAirplane);
router.get('/', AirportController.getAllAirports);
router.get('/:id', AirportController.getAirportDetails);
router.delete('/:id', AirportController.deleteAirPort);
router.patch('/:id', AirportController.updateAirport);

module.exports = router;
