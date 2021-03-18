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

describe('#Academics Details Models', function test() {
  const { ExamYears, Academics, UserAcademicRecords } = AcademicsModels(sequelize, dataTypes);
  const Users = UsersModel(sequelize, dataTypes);
  const examYears = new ExamYears();
  const academics = new Academics();
  const userAcademicRecords = new UserAcademicRecords();

  before('creating associations', function association() {
    ExamYears.associate({ Academics, UserAcademicRecords });
    Academics.associate({ ExamYears, UserAcademicRecords });
    UserAcademicRecords.associate({ Academics, ExamYears, Users });
  });

  context('ExamYears Model', function testingModel() {
    checkModelName(ExamYears)('examYear');

    it('Associations should exist', function testAssociations() {
      expect(ExamYears.hasMany).to.have.been.calledWith(UserAcademicRecords);
      expect(ExamYears.belongsToMany)
        .to.have.been.calledWith(Academics, { through: UserAcademicRecords });
    });

    ['id', 'examination'].forEach(checkPropertyExists(examYears));
  });

  context('Academics Model', function testingModel() {
    checkModelName(Academics)('academics');

    it('Associations should exist', function testAssociations() {
      expect(Academics.hasMany).to.have.been.calledWith(UserAcademicRecords);
      expect(Academics.belongsToMany)
        .to.have.been.calledWith(ExamYears, { through: UserAcademicRecords });
    });

    ['id', 'yearHeld', 'maxMarks', 'obtainedMarks', 'cgpa', 'awards', 'institute', 'majors'].forEach(checkPropertyExists(academics));
  });
  context('User Academics Records Model', function testingModel() {
    checkModelName(UserAcademicRecords)('userAcademicRecord');

    it('Associations should exist', function testAssociations() {
      expect(UserAcademicRecords.belongsTo).to.have.been.calledWith(Academics);
      expect(UserAcademicRecords.belongsTo).to.have.been.calledWith(ExamYears);
      expect(UserAcademicRecords.belongsTo).to.have.been.calledWith(Users);
    });

    [].forEach(checkPropertyExists(userAcademicRecords));
  });
});
