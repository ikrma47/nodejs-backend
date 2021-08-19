var app = require('../index.js');
var db = require('../config/database.js');
var {
  Users,
  Details,
  Address,
  PhoneNumbers,
  ExamYears,
  Academics,
  UserAcademicRecords,
  Experience,
  Courses,
  CoursePreference,
  DepartmentCourse,
  Departments,
  Preferences,
  ApplicationStatus,
  UploadedDocument,
  Batch,
  Semester,
  SemesterCourse,
  AcademicTerm,
  SemesterDetail,
  OfferedCourse,
  SemesterEnrollment,
  OfferedProgram,
} = require('../models/models');

(async () => {
  try {
    await db.authenticate();
    console.log('database is configured');
    await Users.sync({ alter: true });
    console.log('Users table is synced');
    await Details.sync({ alter: true });
    console.log('details table is synced');
    await Address.sync({ alter: true });
    console.log('address table is synced');
    await PhoneNumbers.sync({ alter: true });
    console.log('phoneNumbers table is synced');
    await ExamYears.sync({ alter: true });
    console.log('exams years table is synced');
    await Academics.sync({ alter: true });
    console.log('academics table is synced');
    await UserAcademicRecords.sync({ alter: true });
    console.log('user records table is synced');
    await Experience.sync({ alter: true });
    console.log('experience table is synced');
    await Departments.sync({ alter: true });
    console.log('department table is synced');
    await Courses.sync({ alter: true });
    console.log('course table is synced');
    await Preferences.sync({ alter: true });
    console.log('pereference table is synced');
    await CoursePreference.sync({ alter: true });
    console.log('coursePreference table is synced');
    await DepartmentCourse.sync({ alter: true });
    console.log('departmentCourse table is synced');
    await ApplicationStatus.sync({ alter: true });
    console.log('application status table is synced');
    await UploadedDocument.sync({ alter: true });
    console.log('uploaded documents table is synced');
    await Batch.sync({ alter: true });
    console.log('Batch Table is synced');
    await Semester.sync({ alter: true });
    console.log('Semester Table is synced');
    await SemesterCourse.sync({ alter: true });
    console.log('SemesterCourse Table is synced');
    await AcademicTerm.sync({ alter: true });
    console.log('AcademicTerm Table is synced');
    await SemesterDetail.sync({ alter: true });
    console.log('SemesterDetail Table is synced');
    await OfferedCourse.sync({ alter: true });
    console.log('OfferedCourse Table is synced');
    await SemesterEnrollment.sync({ alter: true });
    console.log('SemesterEnrollment Table is synced');
    await OfferedProgram.sync({ alter: true });
    console.log('OfferedProgram Table is synced');
  } catch (err) {
    console.log('error is ', err);
  }
})();

app.listen(process.env.PORT || 3001, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
