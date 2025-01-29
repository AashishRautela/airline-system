const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

const createAirplane = async (data) => {
  try {
    const airplane = await AirplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == 'TypeError') {
      throw new AppError(
        'Something went wrong while creating error',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    throw error;
  }
};

module.exports = { createAirplane };
