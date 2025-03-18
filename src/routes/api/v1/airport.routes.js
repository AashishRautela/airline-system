const express = require('express');
const { AirportController } = require('../../../controllers');
const router = express.Router();

router.post('/', AirportController.createAirplane);

module.exports = router;
