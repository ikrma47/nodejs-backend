var { STRING } = require('sequelize').DataTypes;
var db = require('../config/database');

var Departments = db.define(
  'department',
  { departmentName: { type: STRING, allowNull: false } },
  { tableName: 'departments', timestamps: true, createdAt: true },
);

module.exports = Departments;
