const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

class Airport extends Model {}

Airport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Airport',
    tableName: 'airports',
    timestamps: true
  }
);

module.exports = Airport;
