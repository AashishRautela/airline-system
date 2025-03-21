const Airplane = require('./Airplane.model.js');
const City = require('./City.model.js');
const Airport = require('./Airport.model.js');
const Flight = require('./Flight.model.js');

Airplane.hasMany(Flight, { foreignKey: 'airplaneId', onDelete: 'CASCADE' });
Flight.belongsTo(Airplane, { foreignKey: 'airplaneId', onDelete: 'CASCADE' });

// Define belongsTo with alias for departure airport
Flight.belongsTo(Airport, {
  foreignKey: 'departureAirportId',
  targetKey: 'code',
  onDelete: 'CASCADE',
  as: 'DepartureAirport'
});
Airport.hasMany(Flight, {
  foreignKey: 'departureAirportId',
  sourceKey: 'code',
  onDelete: 'CASCADE',
  as: 'DepartureAirportFlights'
});

// Define belongsTo with alias for arrival airport
Flight.belongsTo(Airport, {
  foreignKey: 'arrivalAirportId',
  targetKey: 'code',
  onDelete: 'CASCADE',
  as: 'ArrivalAirport'
});
Airport.hasMany(Flight, {
  foreignKey: 'arrivalAirportId',
  sourceKey: 'code',
  onDelete: 'CASCADE',
  as: 'ArrivalAirportFlights'
});

Airport.belongsTo(City, { foreignKey: 'cityId', onDelete: 'CASCADE' });
City.hasMany(Airport, { foreignKey: 'cityId', onDelete: 'CASCADE' });

module.exports = {
  Airplane,
  City,
  Airport,
  Flight
};
