const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const AppError = require('../utils/errors/appError');
const { json } = require('sequelize');

const createAirplane = async (req, res) => {
  try {
    const { modelNumber, capacity } = req.body;
    if (!modelNumber) {
      throw new AppError(['Model Number is required'], StatusCodes.BAD_REQUEST);
    }

    const airplane = await AirplaneService.create({
      modelNumber,
      capacity
    });

    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

const getAirPlaneDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError(['Request Data Missing'], StatusCodes.BAD_REQUEST);
    }
    const airplane = await AirplaneService.getAirplane(id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

const deleteAirPlane = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError(['Request Data Missing'], StatusCodes.BAD_REQUEST);
    }
    const airplane = await AirplaneService.deleteAirPlane(id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

const getAllAirplanes = async (req, res) => {
  try {
    const airplanes = await AirplaneService.getAllAirplanes();
    SuccessResponse.data = airplanes;

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

const updateAirplane = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const airplane = await AirplaneService.updateAirplane(id, data);
    SuccessResponse.data = airplane[0];

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
  getAirPlaneDetails,
  deleteAirPlane,
  getAllAirplanes,
  updateAirplane
};
