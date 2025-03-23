const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');
const { Enums } = require('../utils/common');
const { BUSSINESS, ECONOMY, FIRST_CLASS, PREMIUM_ECONOMY } = Enums.SEAT_TYPE;

class Seat extends Model {}

Seat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'airplanes',
        key: 'id'
      }
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: [BUSSINESS, ECONOMY, FIRST_CLASS, PREMIUM_ECONOMY],
      defaultValue: ECONOMY,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Seat',
    tableName: 'seats'
  }
);

module.exports = Seat;
