const { DataTypes } = require("sequelize");
const sequelize = require("./db");


// Define Role schema
const Role = sequelize.define("SRole", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});

module.exports = Role;
