'use strict';

module.exports = (sequelize, DataTypes) => {
  const entry = sequelize.define('entry', {
    item: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    payment: DataTypes.STRING,
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    currency: DataTypes.STRING,
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  entry.associate = model => {
    entry.belongsTo(model.user);
  };
  return entry;
};