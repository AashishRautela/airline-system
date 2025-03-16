const express = require('express');
const router = express.Router();
const { CityController } = require('../../../controllers');

router.post('/', CityController.create);
router.post('/bulk', CityController.bulkCreate);

module.exports = router;
