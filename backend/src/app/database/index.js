const Sequelize = require('sequelize');
const dbConfig = require('../../config/database') ;
const World = require('../models/World');

const connection = new Sequelize(dbConfig);

World.init(connection);

module.exports = connection;