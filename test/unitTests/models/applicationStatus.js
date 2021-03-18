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

describe('ApplicationStatus Model', function describing() {
  const { Users } = UsersModel(sequelize, dataTypes);
  const { ApplicationStatus } = ApplicationStatusModel(sequelize, dataTypes);
  const AppStatus = new ApplicationStatus();

  before('Creating association', function association() {
    ApplicationStatus.associate({ Users });
  });

  checkModelName(ApplicationStatus)('applicationStatus');

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

  it('should be associated with Users model', function checkAssociation() {
    sinon.assert.calledWith(ApplicationStatus.belongsTo, Users);
  });
});
