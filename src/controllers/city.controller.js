const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const AppError = require('../utils/errors/appError');
const { CityService } = require('../services');

const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new AppError(['Request Data missing'], StatusCodes.BAD_REQUEST);
    }

    const city = await CityService.createCity({ name });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

const bulkCreate = async (req, res) => {
  try {
    const { cities } = req.body; // Expect an array of city names

    if (!Array.isArray(cities) || cities.length === 0) {
      throw new AppError(['Request Data missing'], StatusCodes.BAD_REQUEST);
    }

    const validCities = cities
      .map((city) => city.name.trim())
      .filter((name) => name.length > 0)
      .map((name) => ({ name }));

    if (validCities.length === 0) {
      throw new AppError(
        ['No valid city names provided'],
        StatusCodes.BAD_REQUEST
      );
    }

    const createdCities = await CityService.bulkCreateCities(validCities);

    SuccessResponse.data = createdCities;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

const getCityDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError(['Requied data missing'], StatusCodes.BAD_REQUEST);
    }
    const city = await CityService.getCityDetails(id);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

module.exports = { create, bulkCreate, getCityDetails };
