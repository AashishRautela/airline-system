const { StatusCodes } = require('http-status-codes');
const { AirportService } = require('../services/index');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const AppError = require('../utils/errors/appError');

const createAirplane = async (req, res) => {
  try {
    const { name, cityId, code, address } = req.body;

    if (!name || !cityId || !code) {
      throw new AppError(['Request Data missing'], StatusCodes.BAD_REQUEST);
    }
    const airport = await AirportService.createAirport({
      name,
      cityId,
      code,
      address
    });
    SuccessResponse.data = airport;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

module.exports = { createAirplane };
