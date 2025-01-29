const express = require('express');
const sequelize = require('./database/database.js');
require('dotenv').config();
const { logger, port } = require('./config/index.js');
const app = require('./app.js');

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    await sequelize.sync(); // Uncomment if you want to sync models automatically

    app.listen(port, () => {
      console.log(`Server is listening at port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
