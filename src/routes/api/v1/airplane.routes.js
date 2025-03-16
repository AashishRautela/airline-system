const express = require('express');
const router = express.Router();
const { AirplaneController } = require('../../../controllers');

router.post('/', AirplaneController.createAirplane);
router.get('/', AirplaneController.getAllAirplanes);
router.patch('/:id', AirplaneController.updateAirplane);
router.get('/:id', AirplaneController.getAirPlaneDetails);
router.delete('/:id', AirplaneController.deleteAirPlane);

module.exports = router;
