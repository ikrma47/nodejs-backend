/* eslint-disable no-undef */
var {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var AcademicsModels = require('../../../models/academics');
var UsersModel = require('../../../models/user');

var { expect } = chai;
chai.use(sinonChai);

describe('#academics detail Models', function test() {
  const { examYear, academics, userAcademicRecord } = AcademicsModels(sequelize, dataTypes);
  const User = UsersModel(sequelize, dataTypes);
  const examYears = new examYear();
  const academics = new academics();
  const userAcademicRecords = new userAcademicRecord();

  before('creating associations', function association() {
    examYear.associate({ academics, userAcademicRecord });
    academics.associate({ examYear, userAcademicRecord });
    userAcademicRecord.associate({ academics, examYear, User });
  });

  context('examYear Model', function testingModel() {
    checkModelName(examYear)('examYear');

    it('Associations should exist', function testAssociations() {
      expect(examYear.hasMany).to.have.been.calledWith(userAcademicRecord);
      expect(examYear.belongsToMany)
        .to.have.been.calledWith(academics, { through: userAcademicRecord });
    });

    ['id', 'examination'].forEach(checkPropertyExists(examYears));
  });

  context('academics Model', function testingModel() {
    checkModelName(academics)('academics');

    it('Associations should exist', function testAssociations() {
      expect(academics.hasMany).to.have.been.calledWith(userAcademicRecord);
      expect(academics.belongsToMany)
        .to.have.been.calledWith(examYear, { through: userAcademicRecord });
    });

    ['id', 'yearHeld', 'maxMarks', 'obtainedMarks', 'cgpa', 'awards', 'institute', 'majors'].forEach(checkPropertyExists(academics));
  });
  context('User academics Records Model', function testingModel() {
    checkModelName(userAcademicRecord)('userAcademicRecord');

    it('Associations should exist', function testAssociations() {
      expect(userAcademicRecord.belongsTo).to.have.been.calledWith(academics);
      expect(userAcademicRecord.belongsTo).to.have.been.calledWith(examYear);
      expect(userAcademicRecord.belongsTo).to.have.been.calledWith(User);
    });

    [].forEach(checkPropertyExists(userAcademicRecords));
  });
});
