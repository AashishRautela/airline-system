const { Sequelize } = require('sequelize');
const config = require('../config/index.js');

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'postgres',
    port: config.db.port,
    logging: false
  }
);

module.exports = sequelize;
