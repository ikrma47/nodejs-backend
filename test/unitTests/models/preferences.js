/* eslint-disable no-undef */
var {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var PreferenceModel = require('../../../models/preferences');
var CoursesModel = require('../../../models/courses');

var { expect } = chai;
chai.use(sinonChai);

describe('Preference Model', function test() {
  const { Preferences } = PreferenceModel(sequelize, dataTypes);
  const { Courses, CoursePreference } = CoursesModel(sequelize, dataTypes);
  const preferences = new Preferences();

  before('creating associations', function associations() {
    Preferences.associate({ Courses, CoursePreference });
  });

  checkModelName(Preferences)('preference');

  it('should have associations exist', function associationTest() {
    expect(Preferences.belongsToMany)
      .to.have.been.calledWith(Courses, { through: CoursePreference });
    expect(Preferences.hasMany).to.have.been.calledWith(CoursePreference);
  });

  ['preference'].forEach(checkPropertyExists(preferences));
});
