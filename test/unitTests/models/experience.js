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
  const { User } = UsersModel(sequelize, dataTypes);
  const { experience } = ExperienceModel(sequelize, dataTypes);
  const experience = new experience();

  before('creating associations', function associations() {
    experience.associate({ User });
  });

  checkModelName(experience)('experience');

  it('should have associations exist', function associationTest() {
    expect(experience.belongsTo).to.have.been.calledWith(User);
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
