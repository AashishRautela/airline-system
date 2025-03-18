const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

const createAirport = async (data) => {
  try {
    const airport = await AirportRepository.create(data);
    return airport;
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
      ['Something went wrong while creating airport'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { createAirport };
