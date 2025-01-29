const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');

const createAirplane = async (req, res) => {
  try {
    const { model_number, capacity } = req.body;

    const airplane = await AirplaneService.createAirplane({
      model_number,
      capacity
    });

    if (!airplane) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Failed to create airplane',
        data: {},
        error: { message: 'Unable to create airplane' }
      });
    }

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Airplane created successfully',
      data: airplane,
      error: {}
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create airplane',
      data: {},
      error: { message: error.message || 'Internal Server Error' }
    });
  }
};

module.exports = { createAirplane };
