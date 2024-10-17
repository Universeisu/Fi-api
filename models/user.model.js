const { DataTypes } = require("sequelize");
const sequelize = require("./db");

// Define Role schema
const User = sequelize.define("SUser", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT, // เก็บตัวเลขแบบทศนิยม
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
  longitude: {
    type: DataTypes.FLOAT, // เก็บตัวเลขแบบทศนิยม
    allowNull: false, // อนุญาตให้ค่านี้เป็นค่าว่างได้
  },
});

module.exports = User;
