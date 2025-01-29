require('dotenv').config();
const logger = require('./logger.config.js');

module.exports = {
  port: process.env.PORT || 3001,

  //db configs
  db: {
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)
  },
  logger
};
