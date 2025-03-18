const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

class Airport extends Model {}

Airport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    modelName: 'Airport',
    tableName: 'Airport',
    timestamps: true
  }
);
