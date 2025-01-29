const { AirplaneRepository } = require('../repositories');

const createAirplane = async (data) => {
  try {
    const airplane = await AirplaneRepository.create(data);
    return airplane;
  } catch (error) {
    throw error;
  }
};

module.exports = { createAirplane };
