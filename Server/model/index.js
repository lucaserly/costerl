'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432'
});

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection with database: ${config.database}`);
  }, (error) => {
    console.log('Unable to connect to the database:', error);
  });

module.exports = db;