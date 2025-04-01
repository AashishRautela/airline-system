const CrudRepository = require('./crud.repository.js');
const { Flight, Airplane, Airport, City } = require('../models');
const { Sequelize } = require('sequelize');
const sequelize = require('../database/database.js');

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filters) {
    const flights = await Flight.findAll({
      where: filters,
      include: [
        {
          model: Airplane,
          required: true,
          attributes: { exclude: ['id', 'created_at', 'updated_at'] }
        },
        {
          model: Airport,
          required: true,
          as: 'DepartureAirport',
          on: {
            col1: Sequelize.where(
              Sequelize.col('Flight.departureAirportId'),
              '=',
              Sequelize.col('DepartureAirport.code')
            )
          },
          attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'code'] },
          include: {
            model: City,
            required: true,
            attributes: { exclude: ['id', 'created_at', 'updated_at', 'id'] }
          }
        },
        {
          model: Airport,
          required: true,
          as: 'ArrivalAirport',
          on: {
            col1: Sequelize.where(
              Sequelize.col('Flight.arrivalAirportId'),
              '=',
              Sequelize.col('ArrivalAirport.code')
            )
          },
          attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'code'] },
          include: {
            model: City,
            required: true,
            // on: {
            //   col1: Sequelize.where(
            //     Sequelize.col('ArrivalAirport.cityId'),
            //     '=',
            //     Sequelize.col('ArrivalAirport.City.id')
            //   )
            // },
            attributes: { exclude: ['id', 'created_at', 'updated_at', 'id'] }
          }
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    return flights;
  }

  async getFlightDetails(data) {
    const flight = await Flight.findByPk(data, {
      include: [
        {
          model: Airplane,
          required: true,
          attributes: { exclude: ['id', 'created_at', 'updated_at'] }
        },
        {
          model: Airport,
          required: true,
          as: 'DepartureAirport',
          on: {
            col1: Sequelize.where(
              Sequelize.col('Flight.departureAirportId'),
              '=',
              Sequelize.col('DepartureAirport.code')
            )
          },
          attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'code'] },
          include: {
            model: City,
            required: true,
            attributes: { exclude: ['id', 'created_at', 'updated_at', 'id'] }
          }
        },
        {
          model: Airport,
          required: true,
          as: 'ArrivalAirport',
          on: {
            col1: Sequelize.where(
              Sequelize.col('Flight.arrivalAirportId'),
              '=',
              Sequelize.col('ArrivalAirport.code')
            )
          },
          attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'code'] },
          include: {
            model: City,
            required: true,
            attributes: { exclude: ['id', 'created_at', 'updated_at', 'id'] }
          }
        }
      ]
    });

    return flight;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    return await sequelize.transaction(async (transaction) => {
      const [results] = await sequelize.query(
        `SELECT * FROM flights WHERE flights.id = :flightId FOR UPDATE`,
        {
          replacements: { flightId },
          type: sequelize.QueryTypes.SELECT,
          transaction
        }
      );

      let flight;
      if (dec) {
        flight = await Flight.decrement('totalSeats', {
          by: seats,
          where: { id: flightId },
          transaction
        });
      } else {
        flight = await Flight.increment('totalSeats', {
          by: seats,
          where: { id: flightId },
          transaction
        });
      }

      return flight;
    });
  }
}

module.exports = new FlightRepository();
