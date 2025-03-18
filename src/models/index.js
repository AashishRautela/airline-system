const Airplane = require('./Airplane.model.js');
const City = require('./City.model.js');
const Airport = require('./Airport.model.js');
const Flight = require('./Flight.model.js');

// ✅ Define Associations Here
Airplane.hasMany(Flight, { foreignKey: 'airplaneId', onDelete: 'CASCADE' });
Flight.belongsTo(Airplane, { foreignKey: 'airplaneId', onDelete: 'CASCADE' });

Airport.hasMany(Flight, {
  foreignKey: 'departureAirportId',
  as: 'departingFlights',
  onDelete: 'CASCADE'
});
Flight.belongsTo(Airport, {
  foreignKey: 'departureAirportId',
  as: 'departureAirport',
  onDelete: 'CASCADE'
});

Airport.hasMany(Flight, {
  foreignKey: 'arrivalAirportId',
  as: 'arrivingFlights',
  onDelete: 'CASCADE'
});
Flight.belongsTo(Airport, {
  foreignKey: 'arrivalAirportId',
  as: 'arrivalAirport',
  onDelete: 'CASCADE'
});

Airport.belongsTo(City, { foreignKey: 'cityId', onDelete: 'CASCADE' });
City.hasMany(Airport, { foreignKey: 'cityId', onDelete: 'CASCADE' });

module.exports = {
  Airplane,
  City,
  Airport,
  Flight
};
