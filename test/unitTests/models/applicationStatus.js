/* eslint-disable no-undef */
var {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
var sinon = require('sinon');
var ApplicationStatusModel = require('../../../models/applicationStatus');
var UsersModel = require('../../../models/user');

describe('applicationStatus Model', function describing() {
  const { User } = UsersModel(sequelize, dataTypes);
  const { applicationStatus } = ApplicationStatusModel(sequelize, dataTypes);
  const AppStatus = new applicationStatus();

  before('Creating association', function association() {
    applicationStatus.associate({ User });
  });

  checkModelName(applicationStatus)('applicationStatus');

  context('should have properties', function checkingProperties() {
    [
      'isSubmitted',
      'isAccepted',
      'comments',
      'isProfile',
      'isCourseCategory',
      'isFirstYear',
      'isSecondYear',
      'isThirdYear',
      'isFinalYear',
      'isGAT',
      'isMS',
      'isExperience',
      'isPreference',
      'isCnicFront',
      'isCnicBack',
      'isMatricCertificate',
      'isIntermediateCertificate',
      'isFirstSemesterDmc',
      'isSecondSemesterDmc',
      'isThirdSemesterDmc',
      'isFourthSemesterDmc',
      'isFifthSemesterDmc',
      'isSixthSemesterDmc',
      'isSeventhSemesterDmc',
      'isEighthSemesterDmc',
      'isBsCertificate',
      'acceptedBy',
      'rejectedBy',
    ].forEach(checkPropertyExists(AppStatus));
  });

  it('should be associated with User model', function checkAssociation() {
    sinon.assert.calledWith(applicationStatus.belongsTo, User);
  });
});
