const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');
const moment = require('moment');
const { Op } = require('sequelize');

const createFlight = async (data) => {
  try {
    const { departureTime, arrivalTime } = data;

    if (moment(departureTime).isAfter(moment(arrivalTime))) {
      throw new AppError(
        ['Departure time must before arrival time'],
        StatusCodes.BAD_REQUEST
      );
    }
    const flight = await FlightRepository.create(data);
    return flight;
  } catch (error) {
    console.log('error', error);
    if (error instanceof AppError) {
      throw error;
    }
    let errorMessages = [];

    if (error.name === 'SequelizeUniqueConstraintError') {
      errorMessages.push(...error.errors.map((err) => err.message));
    }
    if (errorMessages.length > 0) {
      throw new AppError(errorMessages, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ['Something went wrong while creating flight'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllFlights = async (query) => {
  try {
    let customFilters = {};

    // FROM-TO
    if (query.trips) {
      [departureAirportId, arrivalAirportId] = query.trips.split('-');

      if (departureAirportId === arrivalAirportId) {
        throw new AppError(
          ['Departure Airport and arrival airport cannot be same'],
          StatusCodes.BAD_REQUEST
        );
      }

      customFilters.departureAirportId = departureAirportId;
      customFilters.arrivalAirportId = arrivalAirportId;
    }

    // price MIN-MAX
    if (query.price) {
      [minimumPrice, maximumPrice] = query.price.split('-');

      customFilters.price = {
        [Op.between]: [
          minimumPrice,
          maximumPrice == undefined ? 20000 : maximumPrice
        ]
      };
    }

    // available seats

    if (query.travellers) {
      customFilters.totalSeats = { [Op.gte]: query.travellers };
    }

    if (query.date) {
      customFilters.departureTime = {
        [Op.gte]: query.date
      };
    }

    const flights = await FlightRepository.getAllFlights(customFilters);
    return flights;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      ['Something went wrong while getting all flights'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getFlight = async (data) => {
  try {
    const flight = await FlightRepository.getFlightDetails(data);
    return flight;
  } catch (error) {
    console.log('error', error);
    if (error instanceof AppError) {
      throw error;
    }
    let errorMessages = [];

    if (error.name === 'SequelizeUniqueConstraintError') {
      errorMessages.push(...error.errors.map((err) => err.message));
    }
    if (errorMessages.length > 0) {
      throw new AppError(errorMessages, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ['Something went wrong while creating flight'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { createFlight, getAllFlights, getFlight };
