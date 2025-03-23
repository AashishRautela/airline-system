const { SeatService } = require('../services');
const AppError = require('../utils/errors/appError');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');

const createSeats = async (req, res) => {
  try {
    const { seats } = req.body;
    const createdSeats = await SeatService.createSeats(seats);
    SuccessResponse.data = createdSeats;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

module.exports = { createSeats };
