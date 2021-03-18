/* eslint-disable no-undef */
var {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var ExperienceModel = require('../../../models/experience');
var UsersModel = require('../../../models/user');

var { expect } = chai;
chai.use(sinonChai);

describe('Documents Model', function test() {
  const { Users } = UsersModel(sequelize, dataTypes);
  const { Experience } = ExperienceModel(sequelize, dataTypes);
  const experience = new Experience();

  before('creating associations', function associations() {
    Experience.associate({ Users });
  });

  checkModelName(Experience)('experience');

  it('should have associations exist', function associationTest() {
    expect(Experience.belongsTo).to.have.been.calledWith(Users);
  });

  [
    'jobTitle',
    'organization',
    'from',
    'to',
    'salary',
    'duty',
  ].forEach(checkPropertyExists(experience));
});
