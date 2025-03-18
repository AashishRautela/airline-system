const express = require('express');
const router = express.Router();
const { CityController } = require('../../../controllers');

router.post('/', CityController.create);
router.post('/bulk', CityController.bulkCreate);
router.get('/:id', CityController.getCityDetails);

module.exports = router;
