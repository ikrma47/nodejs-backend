var { BIGINT } = require('sequelize').DataTypes;
var Users = require('./user');
var ApplicationStatus = require('./applicationStatus');
var { Details, Address, PhoneNumbers } = require('./userPersonalDetails');
var { ExamYears, Academics, UserAcademicRecords } = require('./academics');
var Experience = require('./experience');
var { Courses, CoursePreference, DepartmentCourse } = require('./courses');
var Preferences = require('./preferences');
var Departments = require('./departments');
var UploadedDocuments = require('./documents');

// Associations (Relationships)

ApplicationStatus.belongsTo(Users, {
  targetKey: 'appId',
  foreignKey: {
    name: 'appId', type: BIGINT, allowNull: false, primaryKey: true, unique: true,
  },
});
Users.hasOne(ApplicationStatus, {
  sourceKey: 'appId',
  foreignKey: {
    name: 'appId', type: BIGINT, allowNull: false, primaryKey: true, unique: true,
  },
});

UploadedDocuments.belongsTo(Users, {
  targetKey: 'appId',
  foreignKey: { name: 'appId', type: BIGINT, allowNull: false },
});

Users.hasMany(UploadedDocuments, {
  sourceKey: 'appId',
  foreignKey: { name: 'appId', type: BIGINT, allowNull: false },
});

Departments.belongsToMany(Courses, { through: DepartmentCourse });
Courses.belongsToMany(Departments, { through: DepartmentCourse });
DepartmentCourse.belongsTo(Departments);
DepartmentCourse.belongsTo(Courses);
Departments.hasMany(DepartmentCourse);
Courses.hasMany(DepartmentCourse);

Preferences.belongsToMany(Courses, { through: CoursePreference });
Courses.belongsToMany(Preferences, { through: CoursePreference });
CoursePreference.belongsTo(Preferences);
CoursePreference.belongsTo(Courses);
Preferences.hasMany(CoursePreference);
Courses.hasMany(CoursePreference);
Departments.hasMany(CoursePreference);
CoursePreference.belongsTo(Departments);

CoursePreference.belongsTo(Users, {
  targetKey: 'appId',
  foreignKey: { name: 'appId', type: BIGINT },
});
Users.hasMany(CoursePreference, {
  sourceKey: 'appId',
  foreignKey: { name: 'appId', type: BIGINT },
});

Experience.belongsTo(Users, {
  targetKey: 'appId',
  foreignKey: { name: 'appId', type: BIGINT },
});
Users.hasMany(Experience, {
  sourceKey: 'appId',
  foreignKey: { name: 'appId', type: BIGINT },
});

UserAcademicRecords.belongsTo(Users, {
  targetKey: 'appId',
  foreignKey: { name: 'appId', type: BIGINT, allowNull: false },
});
Users.hasMany(UserAcademicRecords, {
  sourceKey: 'appId',
  foreignKey: { name: 'appId', type: BIGINT, allowNull: false },
});
UserAcademicRecords.belongsTo(Academics);
UserAcademicRecords.belongsTo(ExamYears);
Academics.hasMany(UserAcademicRecords);
ExamYears.hasMany(UserAcademicRecords);

ExamYears.belongsToMany(Academics, { through: UserAcademicRecords });
Academics.belongsToMany(ExamYears, { through: UserAcademicRecords });

Details.belongsTo(Users, {
  targetKey: 'appId',
  foreignKey: {
    name: 'appId', type: BIGINT, allowNull: false, primaryKey: true, unique: true,
  },
});

Users.hasOne(Details, {
  sourceKey: 'appId',
  foreignKey: {
    name: 'appId', type: BIGINT, allowNull: false, primaryKey: true, unique: true,
  },
});

Address.belongsTo(Details, {
  targetKey: 'appId',
  foreignKey: {
    name: 'appId', type: BIGINT, allowNull: false, primaryKey: true, unique: true,
  },
});

Details.hasOne(Address, {
  sourceKey: 'appId',
  foreignKey: {
    name: 'appId', type: BIGINT, allowNull: false, primaryKey: true, unique: true,
  },
});

PhoneNumbers.belongsTo(Details, {
  targetKey: 'appId',
  foreignKey: {
    name: 'appId', type: BIGINT, allowNull: false, primaryKey: true, unique: true,
  },
});

Details.hasOne(PhoneNumbers, {
  sourceKey: 'appId',
  foreignKey: {
    name: 'appId', type: BIGINT, allowNull: false, primaryKey: true, unique: true,
  },
});

module.exports = {
  Users,
  Details,
  Address,
  PhoneNumbers,
  ExamYears,
  Academics,
  UserAcademicRecords,
  Experience,
  Courses,
  Preferences,
  Departments,
  CoursePreference,
  DepartmentCourse,
  ApplicationStatus,
  UploadedDocuments,
};
