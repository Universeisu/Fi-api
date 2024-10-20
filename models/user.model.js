const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("SUsers", {
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
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  freezeTableName: true // ทำให้ใช้ชื่อ 'SUser' ตามที่คุณตั้งไว้ และไม่เปลี่ยนเป็นรูปพหูพจน์
});


module.exports = User;
