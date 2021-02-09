var { STRING, BOOLEAN } = require('sequelize').DataTypes;
var db = require('../config/database');

var Courses = db.define(
  'course',
  { courseName: { type: STRING, allowNull: false } },
  { tableName: 'courses', timestamps: true, createdAt: true },
);

var CoursePreference = db.define(
  'coursePreference',
  { isSelected: { type: BOOLEAN, defaultValue: false } },
  { freezeTableName: true, timestamps: false, createdAt: false },
);

var DepartmentCourse = db.define(
  'departmentCourse',
  { courseCategory: { type: STRING, allowNull: false } },
  { freezeTableName: true, timestamps: false, createdAt: false },
);

module.exports = { Courses, DepartmentCourse, CoursePreference };
