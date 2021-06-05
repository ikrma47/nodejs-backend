/* eslint-disable no-undef */
var {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var DepartmentModel = require('../../../models/departments');
var CoursesModel = require('../../../models/courses');

var { expect } = chai;
chai.use(sinonChai);

describe('Department Model', function test() {
  const { Departments } = DepartmentModel(sequelize, dataTypes);
  const { Courses, DepartmentCourse } = CoursesModel(sequelize, dataTypes);
  const departments = new Departments();

  before('creating associations', function associations() {
    Departments.associate({ Courses, DepartmentCourse });
  });

  checkModelName(Departments)('department');

  it('should have associations exist', function associationTest() {
    expect(Departments.belongsToMany)
      .to.have.been.calledWith(Courses, { through: DepartmentCourse });
    expect(Departments.hasMany).to.have.been.calledWith(DepartmentCourse);
  });

  ['departmentName'].forEach(checkPropertyExists(departments));
});
