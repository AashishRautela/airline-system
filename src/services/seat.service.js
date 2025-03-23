const { SeatRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

const createSeats = async (data) => {
  try {
    const seats = await SeatRepository.bulkCreate(data, {
      ignoreDuplicates: true
    });
    return seats;
  } catch (error) {
    console.log('error', error);
    let errorMessages = [];

    if (error.name === 'SequelizeValidationError') {
      errorMessages.push(...error.errors.map((err) => err.message));
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      errorMessages.push(...error.errors.map((err) => err.message));
    }

    if (errorMessages.length > 0) {
      throw new AppError(errorMessages, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ['Something went wrong while creating seats'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { createSeats };
