/* eslint-disable no-undef */
var {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var DocumentsModel = require('../../../models/documents');
var UsersModel = require('../../../models/user');

var { expect } = chai;
chai.use(sinonChai);

describe('Documents Model', function test() {
  const { Users } = UsersModel(sequelize, dataTypes);
  const { UploadedDocument } = DocumentsModel(sequelize, dataTypes);
  const uploadedDocument = new UploadedDocument();

  before('creating associations', function associations() {
    UploadedDocument.associate({ Users });
  });

  checkModelName(UploadedDocument)('uploadedDocument');

  it('should have associations exist', function associationTest() {
    expect(UploadedDocument.belongsTo).to.have.been.calledWith(Users);
  });

  [
    'cnicFront',
    'cnicBack',
    'matricCertificate',
    'intermediateCertificate',
    'firstSemesterDmc',
    'secondSemesterDmc',
    'thirdSemesterDmc',
    'fourthSemesterDmc',
    'fifthSemesterDmc',
    'sixthSemesterDmc',
    'seventhSemesterDmc',
    'eighthSemesterDmc',
    'bsCertificate',
  ].forEach(checkPropertyExists(uploadedDocument));
});
