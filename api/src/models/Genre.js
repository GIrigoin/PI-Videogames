const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Genre", {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  });
};
