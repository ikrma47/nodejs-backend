/* eslint-disable no-undef */
var chai = require('chai');
var {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
var sinonChai = require('sinon-chai');
var UsersModel = require('../../../models/user');
var CoursesModels = require('../../../models/courses');
var DocumentsModel = require('../../../models/documents');
var AcademicsModels = require('../../../models/academics');
var ExperienceModel = require('../../../models/experience');
var ProfileModels = require('../../../models/userPersonalDetails');
var ApplicationStatusModel = require('../../../models/applicationStatus');

var { expect } = chai;
chai.use(sinonChai);

describe('User Model', function userModelTest() {
  const { User } = UsersModel(sequelize, dataTypes);
  const { detail } = ProfileModels(sequelize, dataTypes);
  const { experience } = ExperienceModel(sequelize, dataTypes);
  const { coursePreference } = CoursesModels(sequelize, dataTypes);
  const { uploadedDocument } = DocumentsModel(sequelize, dataTypes);
  const { userAcademicRecord } = AcademicsModels(sequelize, dataTypes);
  const { applicationStatus } = ApplicationStatusModel(sequelize, dataTypes);

  const users = new User();

  before('creating associations', function associations() {
    User.associate({
      detail,
      experience,
      uploadedDocument,
      coursePreference,
      applicationStatus,
      userAcademicRecord,
    });
  });

  it('should have associations exists', function assicationsTest() {
    expect(User.hasOne).to.have.been.calledWith(detail);
    expect(User.hasOne).to.have.been.calledWith(applicationStatus);
    expect(User.hasMany).to.have.been.calledWith(experience);
    expect(User.hasMany).to.have.been.calledWith(userAcademicRecord);
    expect(User.hasMany).to.have.been.calledWith(coursePreference);
    expect(User.hasMany).to.have.been.calledWith(uploadedDocument);
  });

  checkModelName(User)('User');

  ['appId', 'email', 'password', 'cnic', 'isVerified', 'otp', 'isAdmin'].forEach(checkPropertyExists(users));
});
