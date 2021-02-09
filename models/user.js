var {
  STRING, BIGINT, INTEGER, BOOLEAN,
} = require('sequelize').DataTypes;
var db = require('../config/database');

var Users = db.define(
  'User',
  {
    appId: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    email: { type: STRING, primaryKey: true, allowNull: false },
    cnic: { type: STRING, primaryKey: true, allowNull: false },
    password: { type: STRING, allowNull: false },
    isVerified: { type: BOOLEAN, defaultValue: false },
    otp: { type: INTEGER, allowNull: true },
    isAdmin: { type: BOOLEAN, defaultValue: false },
  },
  {
    tableName: 'users', timestamps: true, createdAt: true, updatedAt: true,
  },
);

module.exports = Users;
