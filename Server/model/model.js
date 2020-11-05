'use strict';

module.exports = (sequelize, DataTypes) => {
  const entry = sequelize.define('entry', {
    item: DataTypes.STRING,
    category: DataTypes.STRING,
    descritpion: DataTypes.STRING,
    payment: DataTypes.STRING,
    amount: DataTypes.BIGINT,
    currency: DataTypes.STRING,
    date: DataTypes.STRING
  });
  return entry;
};



