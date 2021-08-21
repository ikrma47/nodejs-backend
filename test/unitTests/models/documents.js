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
  const { User } = UsersModel(sequelize, dataTypes);
  const { uploadedDocument } = DocumentsModel(sequelize, dataTypes);
  const uploadedDocument = new uploadedDocument();

  before('creating associations', function associations() {
    uploadedDocument.associate({ User });
  });

  checkModelName(uploadedDocument)('uploadedDocument');

  it('should have associations exist', function associationTest() {
    expect(uploadedDocument.belongsTo).to.have.been.calledWith(User);
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
