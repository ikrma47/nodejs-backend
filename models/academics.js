var {
  STRING, BIGINT, INTEGER, FLOAT,
} = require('sequelize').DataTypes;
var db = require('../config/database.js');

var ExamYears = db.define(
  'examYear',
  {
    id: {
      type: BIGINT,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    examination: { type: STRING, allowNull: false },
  },
  { tableName: 'examYears', timestamps: false, createdAt: false },
);

var Academics = db.define(
  'academics',
  {
    id: {
      type: BIGINT,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    yearHeld: { type: INTEGER },
    maxMarks: { type: INTEGER },
    obtainedMarks: { type: INTEGER },
    cgpa: { type: FLOAT },
    awards: { type: STRING },
    institute: { type: STRING },
    majors: { type: STRING },
  },
  { freezeTableName: true, timestamps: false, createdAt: false },
);

var UserAcademicRecords = db.define(
  'userAcademicRecord',
  {},
  { tableName: 'userAcademicRecords', timestamps: true, createdAt: true },
);

module.exports = { ExamYears, Academics, UserAcademicRecords };
