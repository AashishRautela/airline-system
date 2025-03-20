const CrudRepository = require('./crud.repository.js');
const { Flight } = require('../models');

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filters) {
    const flights = await Flight.findAll({
      where: filters
    });

    return flights;
  }
}

module.exports = new FlightRepository();
