const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

const createFlight = async (data) => {
  try {
    const flight = await FlightRepository.create(data);
    return flight;
  } catch (error) {
    console.log('error', error);
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

module.exports = { createFlight };
