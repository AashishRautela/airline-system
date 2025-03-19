const Airplane = require('./Airplane.model.js');
const City = require('./City.model.js');
const Airport = require('./Airport.model.js');
const Flight = require('./Flight.model.js');

// ✅ Airplane to Flight Relationship
Airplane.hasMany(Flight, { foreignKey: 'airplaneId', onDelete: 'CASCADE' });
Flight.belongsTo(Airplane, { foreignKey: 'airplaneId', onDelete: 'CASCADE' });

// ✅ Airport to Flight (Departure)
Airport.hasMany(Flight, {
  foreignKey: 'departureAirportId',
  onDelete: 'CASCADE'
});
Flight.belongsTo(Airport, {
  foreignKey: 'departureAirportId',
  onDelete: 'CASCADE'
});

// ✅ Airport to Flight (Arrival)
Airport.hasMany(Flight, {
  foreignKey: 'arrivalAirportId',
  onDelete: 'CASCADE'
});
Flight.belongsTo(Airport, {
  foreignKey: 'arrivalAirportId',
  onDelete: 'CASCADE'
});

// ✅ Airport to City Relationship
Airport.belongsTo(City, { foreignKey: 'cityId', onDelete: 'CASCADE' });
City.hasMany(Airport, { foreignKey: 'cityId', onDelete: 'CASCADE' });

module.exports = {
  Airplane,
  City,
  Airport,
  Flight
};
