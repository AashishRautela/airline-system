const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

const create = async (data) => {
  try {
    const airplane = await AirplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == 'SequelizeValidationError') {
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      'Something went wrong while creating aiplane',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { create };
