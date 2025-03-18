const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');
const City = require('./City.model.js');

class Airport extends Model {}

Airport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    address: {
      type: DataTypes.STRING
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Airport',
    tableName: 'Airport',
    timestamps: true
  }
);

Airport.belongsTo(City, { foreignKey: 'cityId' });
City.hasMany(Airport, { foreignKey: 'cityId' });
module.exports = Airport;
