const { Sequelize } = require('sequelize');
const config = require('./database');

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  pool: {
    max: config.connectionLimit,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;

  