const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

class Flight extends Model {}

Flight.init(
  {
    flightNumber: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
      validate: {
        len: [1, 20] // ✅ Fixed validation
      }
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departureAirportId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arrivalAirportId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    boardingGate: {
      // ✅ Changed to STRING
      type: DataTypes.STRING
    },
    price: {
      // ✅ Changed to DECIMAL(10,2)
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Flight',
    tableName: 'flights'
  }
);

module.exports = Flight;
