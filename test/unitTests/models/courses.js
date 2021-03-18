/* eslint-disable no-undef */
var {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var CoursesModel = require('../../../models/courses');
var DepartmentsModel = require('../../../models/departments');
var UsersModel = require('../../../models/user');
var PreferenceModel = require('../../../models/preferences');

var { expect } = chai;
chai.use(sinonChai);

describe('Course And Preferences Models', function tests() {
  const { Courses, CoursePreference, DepartmentCourse } = CoursesModel(sequelize, dataTypes);
  const { Users } = UsersModel(sequelize, dataTypes);
  const { Preferences } = PreferenceModel(sequelize, dataTypes);
  const { Departments } = DepartmentsModel(sequelize, dataTypes);
  const courses = new Courses();
  const coursePreference = new CoursePreference();
  const departmentCourse = new DepartmentCourse();

  before('creating association', function associations() {
    Courses.associate({
      Departments, DepartmentCourse, Preferences, CoursePreference,
    });
    CoursePreference.associate({
      Preferences, Users, Courses, Departments,
    });
    DepartmentCourse.associate({ Departments, Courses });
  });

  context('Courses Model', function modelTests() {
    checkModelName(Courses)('course');

    it('should have associations exists', function associationTest() {
      expect(Courses.belongsToMany)
        .to.have.been.calledWith(Departments, { through: DepartmentCourse });
      expect(Courses.belongsToMany)
        .to.have.been.calledWith(Preferences, { through: CoursePreference });
      expect(Courses.hasMany).to.have.been.calledWith(DepartmentCourse);
      expect(Courses.hasMany).to.have.been.calledWith(CoursePreference);
    });

    ['courseName'].forEach(checkPropertyExists(courses));
  });

  context('Course Preference Model', function modelTests() {
    checkModelName(CoursePreference)('coursePreference');

    it('should have associations exist', function associationTest() {
      expect(CoursePreference.belongsTo).to.have.been.calledWith(Preferences);
      expect(CoursePreference.belongsTo).to.have.been.calledWith(Courses);
      expect(CoursePreference.belongsTo).to.have.been.calledWith(Departments);
      expect(CoursePreference.belongsTo).to.have.been.calledWith(Users);
    });

    ['isSelected'].forEach(checkPropertyExists(coursePreference));
  });
  context('Course Department Model', function modelTests() {
    checkModelName(DepartmentCourse)('departmentCourse');

    it('should have associations exist', function associationTest() {
      expect(DepartmentCourse.belongsTo).to.have.been.calledWith(Departments);
      expect(DepartmentCourse.belongsTo).to.have.been.calledWith(Courses);
    });

    ['courseCategory'].forEach(checkPropertyExists(departmentCourse));
  });
});
