const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

class City extends Model {}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        max: 30
      }
    }
  },
  {
    sequelize,
    modelName: 'City',
    tableName: 'City',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

module.exports = City;
