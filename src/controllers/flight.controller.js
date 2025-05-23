const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const AppError = require('../utils/errors/appError');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

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

const getAllFlights = async (req, res) => {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

const getFlight = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError(['Request data missing'], StatusCodes.BAD_REQUEST);
    }

    const flight = await FlightService.getFlight(id);
    SuccessResponse.data = flight;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

const updateFlightSeats = async (req, res) => {
  try {
    const { id } = req.params;
    const { seats } = req.body;

    if (!id || !seats) {
      ErrorResponse.message =
        'Something went wrong while updating flight seats ';
      ErrorResponse.error = new AppError(
        ['Request data missing'],
        StatusCodes.BAD_REQUEST
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    const flight = await FlightService.updateRemainingSeats({
      flightId: id,
      seats: req.body.seats,
      dec: req.body.dec
    });

    SuccessResponse.data = {};
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

module.exports = { createFlight, getAllFlights, getFlight, updateFlightSeats };
