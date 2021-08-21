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
  const { department } = DepartmentModel(sequelize, dataTypes);
  const { course, departmentCourse } = CoursesModel(sequelize, dataTypes);
  const departments = new department();

  before('creating associations', function associations() {
    department.associate({ course, departmentCourse });
  });

  checkModelName(department)('department');

  it('should have associations exist', function associationTest() {
    expect(department.belongsToMany)
      .to.have.been.calledWith(course, { through: departmentCourse });
    expect(department.hasMany).to.have.been.calledWith(departmentCourse);
  });

  ['departmentName'].forEach(checkPropertyExists(departments));
});
