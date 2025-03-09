const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

class Airplane extends Model {}

Airplane.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    model_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        max: 1000
      }
    }
  },
  {
    sequelize,
    modelName: 'Airplane',
    tableName: 'airplanes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

module.exports = Airplane;
