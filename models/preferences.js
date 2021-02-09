var { STRING } = require('sequelize').DataTypes;
var db = require('../config/database');

var Preferences = db.define(
  'preference',
  { preference: { type: STRING, allowNull: false } },
  { freezeTableName: true, timestamps: false, createdAt: false },
);

module.exports = Preferences;
