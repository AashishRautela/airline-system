const { CityRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/appError');

const createCity = async (data) => {
  try {
    const city = await CityRepository.create(data);
    return city;
  } catch (error) {
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
      ['Something went wrong while creating airplane'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const bulkCreateCities = async (cities) => {
  try {
    const createdCities = await CityRepository.bulkCreate(cities, {
      ignoreDuplicates: true
    });
    return createdCities;
  } catch (error) {
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
      ['Something went wrong while creating cities'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getCityDetails = async (data) => {
  try {
    const city = await CityRepository.get(data);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(['City not found'], StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      ['Something went wrong while getting city details'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { createCity, bulkCreateCities, getCityDetails };
