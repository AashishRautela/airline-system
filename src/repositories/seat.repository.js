const CrudRepository = require('./crud.repository.js');
const { Seat } = require('../models');

class SeatRepository extends CrudRepository {
  constructor() {
    super(Seat);
  }
}

module.exports = new SeatRepository();
