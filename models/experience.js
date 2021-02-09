var { STRING, BIGINT } = require('sequelize').DataTypes;
var db = require('../config/database');

var Experience = db.define(
  'experience',
  {
    jobTitle: { type: STRING, allowNull: false },
    organization: { type: STRING, allowNull: false },
    from: { type: STRING, allowNull: false },
    to: { type: STRING, allowNull: false },
    salary: { type: BIGINT, allowNull: false },
    duty: { type: STRING, allowNull: false },
  },
  { freezeTableName: true, timestamps: true, createdAt: true },
);

module.exports = Experience;
