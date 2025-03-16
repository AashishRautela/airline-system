const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const AppError = require('../utils/errors/appError');
const { CityService } = require('../services');

const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name.trim()) {
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

module.exports = { create };
