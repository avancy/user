const Sequelize = require('sequelize');
const initModels = require('./models/init-models');
const pg = require('pg');

let config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectModule: pg,
  quoteIdentifiers: false,
  underscored: true,
  underscoredAll: true,
};

let sequelize = new Sequelize(config);

module.exports = initModels(sequelize);
