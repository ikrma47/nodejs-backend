/* eslint-disable no-undef */
var {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var ProfileModels = require('../../../models/userPersonalDetails');
var UsersModel = require('../../../models/user');

var { expect } = chai;
chai.use(sinonChai);

describe('Profile Models', function tests() {
  const { detail, phoneNumber, address } = ProfileModels(sequelize, dataTypes);
  const { User } = UsersModel(sequelize, dataTypes);

  before('creating associations', function associations() {
    detail.associate({ User, phoneNumber, address });
    phoneNumber.associate({ detail });
    address.associate({ detail });
  });

  context('detail Model', function DetailModelTest() {
    const details = new detail();

    checkModelName(detail)('detail');

    it('should have associations exists', function associationsTest() {
      expect(detail.hasOne).to.have.been.calledWith(address);
      expect(detail.belongsTo).to.have.been.calledWith(User);
      expect(detail.hasOne).to.have.been.calledWith(phoneNumber);
    });

    [
      'name',
      'fatherName',
      'dob',
      'domicile',
      'religion',
      'image',
      'entryYear',
      'courseCategory',
    ].forEach(checkPropertyExists(details));
  });

  context('Phone Numbers Model', function PhNumModelTest() {
    const phoneNumbers = new phoneNumber();

    checkModelName(phoneNumber)('phoneNumber');

    it('should have associations exist', function associationsTest() {
      expect(phoneNumber.belongsTo).to.have.been.calledWith(detail);
    });

    ['personalNumber', 'optionalNumber'].forEach(checkPropertyExists(phoneNumbers));
  });

  context('address Model', function addressModelTest() {
    const address = new address();

    checkModelName(address)('address');

    it('should have property exist', function associationTest() {
      expect(address.belongsTo).to.have.been.calledWith(detail);
    });

    ['mailingAddress', 'residentialAddress'].forEach(checkPropertyExists(address));
  });
});
