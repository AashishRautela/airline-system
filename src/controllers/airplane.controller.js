const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

const createAirplane = async (req, res) => {
  try {
    const { model_number, capacity } = req.body;
    if (!model_number) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        ...ErrorResponse,
        message: 'Something went wrong while creating airplane',
        error: { explanation: 'Model Number is required' }
      });
    }

    const airplane = await AirplaneService.createAirplane({
      model_number,
      capacity
    });

    if (!airplane) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        ...ErrorResponse,
        message: 'Failed to create airplane',
        error: { explanation: 'Unable to create airplane' }
      });
    }

    return res.status(StatusCodes.CREATED).json({
      ...SuccessResponse,
      message: 'Airplane created successfully',
      data: airplane
    });
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        ...ErrorResponse,
        message: 'Failed to create airplane',
        error: error
      });
  }
};

module.exports = { createAirplane };
