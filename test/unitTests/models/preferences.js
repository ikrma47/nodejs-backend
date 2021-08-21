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
  const { preferences } = PreferenceModel(sequelize, dataTypes);
  const { course, coursePreference } = CoursesModel(sequelize, dataTypes);
  const preferences = new preferences();

  before('creating associations', function associations() {
    preferences.associate({ course, coursePreference });
  });

  checkModelName(preferences)('preference');

  it('should have associations exist', function associationTest() {
    expect(preferences.belongsToMany)
      .to.have.been.calledWith(course, { through: coursePreference });
    expect(preferences.hasMany).to.have.been.calledWith(coursePreference);
  });

  ['preference'].forEach(checkPropertyExists(preferences));
});
