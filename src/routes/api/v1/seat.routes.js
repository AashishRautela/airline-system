const express = require('express');
const router = express.Router();
const { SeatController } = require('../../../controllers');

router.post('/', SeatController.createSeats);

module.exports = router;
