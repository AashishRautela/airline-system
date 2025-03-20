const { StatusCodes } = require('http-status-codes');
const { AirportService } = require('../services/index');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const AppError = require('../utils/errors/appError');

const createAirplane = async (req, res) => {
  try {
    const { name, cityId, code, address } = req.body;

    if (!name || !cityId || !code) {
      throw new AppError(['Request Data missing'], StatusCodes.BAD_REQUEST);
    }
    const airport = await AirportService.createAirport({
      name,
      cityId,
      code: code.toLowerCase(),
      address
    });
    SuccessResponse.data = airport;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

const getAirportDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError(['Request Data Missing'], StatusCodes.BAD_REQUEST);
    }
    const airport = await AirportService.getAirport(id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

const deleteAirPort = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError(['Request Data Missing'], StatusCodes.BAD_REQUEST);
    }
    const airport = await AirportService.deleteAirport(id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

const getAllAirports = async (req, res) => {
  try {
    const airports = await AirportService.getAllAirports();
    SuccessResponse.data = airports;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        ErrorResponse
      });
  }
};

const updateAirport = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const airport = await AirportService.updateAirport(id, data);
    SuccessResponse.data = airport[0];

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

module.exports = {
  createAirplane,
  updateAirport,
  getAllAirports,
  deleteAirPort,
  getAirportDetails
};
