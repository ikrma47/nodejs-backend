var { DataTypes } = require('sequelize');
var sequelize = require('../config/database');
var { ExamYears, Academics, UserAcademicRecords } = require('./academics')(sequelize, DataTypes);
var { ApplicationStatus } = require('./applicationStatus')(sequelize, DataTypes);
var { Courses, CoursePreference, DepartmentCourse } = require('./courses')(sequelize, DataTypes);
var { Departments } = require('./departments')(sequelize, DataTypes);
var { UploadedDocument } = require('./documents')(sequelize, DataTypes);
var { Experience } = require('./experience')(sequelize, DataTypes);
var { Preferences } = require('./preferences')(sequelize, DataTypes);
var { Users } = require('./user')(sequelize, DataTypes);
var { Details, PhoneNumbers, Address } = require('./userPersonalDetails')(sequelize, DataTypes);
var {
  Batch,
  SemesterDetail,
  Semester,
  SemesterCourse,
  AcademicTerm,
  OfferedCourse,
  SemesterEnrollment,
  OfferedProgram,
} = require('./semesterDetails')(sequelize, DataTypes);

var models = {
  Batch,
  Semester,
  SemesterCourse,
  AcademicTerm,
  SemesterDetail,
  OfferedCourse,
  SemesterEnrollment,
  OfferedProgram,
  ExamYears,
  Academics,
  UserAcademicRecords,
  ApplicationStatus,
  Courses,
  CoursePreference,
  DepartmentCourse,
  Departments,
  UploadedDocument,
  Experience,
  Preferences,
  Users,
  Details,
  PhoneNumbers,
  Address,
};

// associations
Object.keys(models).forEach((model) => {
  if (typeof models[model].associate == 'function') { models[model].associate(models); }
});

module.exports = models;
