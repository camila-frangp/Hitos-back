const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ventas', 'postgres', 'lucas269', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;