'use strict';

module.exports = (sequelize, DataTypes) => {
  const entry = sequelize.define('entry', {
    Item: DataTypes.STRING,
    Category: DataTypes.STRING,
    Descritpion: DataTypes.STRING,
    Payment: DataTypes.STRING,
    Amount: DataTypes.BIGINT,
    Date: DataTypes.BIGINT,
  });
  return entry;
};



