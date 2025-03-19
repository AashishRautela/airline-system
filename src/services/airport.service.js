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

const getAirport = async (data) => {
  try {
    const airport = await AirportRepository.get(data);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(['Aiport not found'], StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      ['Something went wrong while getting airport details'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteAirport = async (data) => {
  try {
    const airport = await AirportRepository.destroy(data);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(['Airport not found'], StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      ['Something went wrong while getting airport details'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllAirports = async () => {
  try {
    const airports = await AirportRepository.getAll();
    return airports;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(['Airport not found'], StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      ['Something went wrong while getting all airport'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateAirport = async (id, data) => {
  try {
    const allowedFields = ['capacity'];

    const fieldsToBeUpdated = allowedFields.reduce((acc, field) => {
      if (Object.keys(data).includes(field)) {
        acc[field] = data[field];
      }
      return acc;
    }, {});

    const airport = await AirportRepository.update(id, fieldsToBeUpdated);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(['Airport not found'], StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      ['Something went wrong while updating airport'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createAirport,
  updateAirport,
  getAllAirports,
  deleteAirport,
  getAirport
};
