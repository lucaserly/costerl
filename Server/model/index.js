'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const config = require('../config');
// const dotenv = require('dotenv');

// const sequelize = new Sequelize(config.database, config.username, config.password, config.config);
const sequelize = new Sequelize(process.env.DATABASE_URL);

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
    console.log(`Connection with database: ${process.env.DATABASE_URL}`);
  }, (error) => {
    console.log('Unable to connect to the database:', error);
  });

module.exports = db;