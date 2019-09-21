const Sequelize = require('sequelize');

require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'example_db',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 20000,
  },
};
