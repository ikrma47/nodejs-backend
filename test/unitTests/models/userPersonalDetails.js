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
  const { Details, PhoneNumbers, Address } = ProfileModels(sequelize, dataTypes);
  const { Users } = UsersModel(sequelize, dataTypes);

  before('creating associations', function associations() {
    Details.associate({ Users, PhoneNumbers, Address });
    PhoneNumbers.associate({ Details });
    Address.associate({ Details });
  });

  context('Details Model', function DetailModelTest() {
    const details = new Details();

    checkModelName(Details)('detail');

    it('should have associations exists', function associationsTest() {
      expect(Details.hasOne).to.have.been.calledWith(Address);
      expect(Details.belongsTo).to.have.been.calledWith(Users);
      expect(Details.hasOne).to.have.been.calledWith(PhoneNumbers);
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
    const phoneNumbers = new PhoneNumbers();

    checkModelName(PhoneNumbers)('phoneNumber');

    it('should have associations exist', function associationsTest() {
      expect(PhoneNumbers.belongsTo).to.have.been.calledWith(Details);
    });

    ['personalNumber', 'optionalNumber'].forEach(checkPropertyExists(phoneNumbers));
  });

  context('Address Model', function addressModelTest() {
    const address = new Address();

    checkModelName(Address)('address');

    it('should have property exist', function associationTest() {
      expect(Address.belongsTo).to.have.been.calledWith(Details);
    });

    ['mailingAddress', 'residentialAddress'].forEach(checkPropertyExists(address));
  });
});
