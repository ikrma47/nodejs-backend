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

describe('Course And preferences Models', function tests() {
  const { course, coursePreference, departmentCourse } = CoursesModel(sequelize, dataTypes);
  const { User } = UsersModel(sequelize, dataTypes);
  const { preferences } = PreferenceModel(sequelize, dataTypes);
  const { department } = DepartmentsModel(sequelize, dataTypes);
  const courses = new course();
  const coursePreference = new coursePreference();
  const departmentCourse = new departmentCourse();

  before('creating association', function associations() {
    course.associate({
      department, departmentCourse, preferences, coursePreference,
    });
    coursePreference.associate({
      preferences, User, course,
    });
    departmentCourse.associate({ department, course });
  });

  context('course Model', function modelTests() {
    checkModelName(course)('course');

    it('should have associations exists', function associationTest() {
      expect(course.belongsToMany)
        .to.have.been.calledWith(department, { through: departmentCourse });
      expect(course.belongsToMany)
        .to.have.been.calledWith(preferences, { through: coursePreference });
      expect(course.hasMany).to.have.been.calledWith(departmentCourse);
      expect(course.hasMany).to.have.been.calledWith(coursePreference);
    });

    ['courseName'].forEach(checkPropertyExists(courses));
  });

  context('Course Preference Model', function modelTests() {
    checkModelName(coursePreference)('coursePreference');

    it('should have associations exist', function associationTest() {
      expect(coursePreference.belongsTo).to.have.been.calledWith(preferences);
      expect(coursePreference.belongsTo).to.have.been.calledWith(course);
      expect(coursePreference.belongsTo).to.have.been.calledWith(User);
    });

    ['isSelected'].forEach(checkPropertyExists(coursePreference));
  });
  context('Course Department Model', function modelTests() {
    checkModelName(departmentCourse)('departmentCourse');

    it('should have associations exist', function associationTest() {
      expect(departmentCourse.belongsTo).to.have.been.calledWith(department);
      expect(departmentCourse.belongsTo).to.have.been.calledWith(course);
    });

    ['courseCategory'].forEach(checkPropertyExists(departmentCourse));
  });
});
