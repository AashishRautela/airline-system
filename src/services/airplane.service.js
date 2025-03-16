const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

const create = async (data) => {
  try {
    const airplane = await AirplaneRepository.create(data);
    return airplane;
  } catch (error) {
    let errorMessages = [];

    if (error.name === 'SequelizeValidationError') {
      errorMessages.push(...error.errors.map((err) => err.message));
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      errorMessages.push(...error.errors.map((err) => err.message));
    }

    console.log('errorMessages--->', errorMessages);
    if (errorMessages.length > 0) {
      throw new AppError(errorMessages, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      ['Something went wrong while creating airplane'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirplane = async (data) => {
  try {
    const airplane = await AirplaneRepository.get(data);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(['Aiplane not found'], StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      ['Something went wrong while getting airplane details'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteAirPlane = async (data) => {
  try {
    const airplane = await AirplaneRepository.destroy(data);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(['Aiplane not found'], StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      ['Something went wrong while getting airplane details'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllAirplanes = async () => {
  try {
    const airplanes = await AirplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(['Aiplane not found'], StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      ['Something went wrong while getting all airplane'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateAirplane = async (id, data) => {
  try {
    const allowedFields = ['capacity'];

    const fieldsToBeUpdated = allowedFields.reduce((acc, field) => {
      if (Object.keys(data).includes(field)) {
        acc[field] = data[field];
      }
      return acc;
    }, {});

    const airplane = await AirplaneRepository.update(id, fieldsToBeUpdated);
    return airplane;
  } catch (error) {
    throw new AppError(
      ['Something went wrong while updating airplane'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  create,
  getAirplane,
  deleteAirPlane,
  getAllAirplanes,
  updateAirplane
};
