const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const AppError = require('../utils/errors/appError');
const { SuccessResponse } = require('../utils/common');

const createFlight = async (req, res) => {
  try {
    const {
      flightNumber,
      airplaneId,
      departureAirportId,
      arrivalAirportId,
      departureTime,
      arrivalTime,
      boardingGate,
      price,
      totalSeats
    } = req.body;
    if (
      !flightNumber ||
      !airplaneId ||
      !departureAirportId ||
      !arrivalAirportId ||
      !departureTime ||
      !arrivalTime ||
      !totalSeats ||
      !price
    ) {
      throw new AppError(['Request data missing'], StatusCodes.BAD_REQUEST);
    }

    const flight = await FlightService.createFlight({
      flightNumber,
      airplaneId,
      departureAirportId,
      arrivalAirportId,
      departureTime,
      arrivalTime,
      boardingGate,
      price,
      totalSeats
    });
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

module.exports = { createFlight };
