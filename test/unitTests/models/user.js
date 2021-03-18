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

describe('Users Model', function userModelTest() {
  const { Users } = UsersModel(sequelize, dataTypes);
  const { Details } = ProfileModels(sequelize, dataTypes);
  const { Experience } = ExperienceModel(sequelize, dataTypes);
  const { CoursePreference } = CoursesModels(sequelize, dataTypes);
  const { UploadedDocument } = DocumentsModel(sequelize, dataTypes);
  const { UserAcademicRecords } = AcademicsModels(sequelize, dataTypes);
  const { ApplicationStatus } = ApplicationStatusModel(sequelize, dataTypes);

  const users = new Users();

  before('creating associations', function associations() {
    Users.associate({
      Details,
      Experience,
      UploadedDocument,
      CoursePreference,
      ApplicationStatus,
      UserAcademicRecords,
    });
  });

  it('should have associations exists', function assicationsTest() {
    expect(Users.hasOne).to.have.been.calledWith(Details);
    expect(Users.hasOne).to.have.been.calledWith(ApplicationStatus);
    expect(Users.hasMany).to.have.been.calledWith(Experience);
    expect(Users.hasMany).to.have.been.calledWith(UserAcademicRecords);
    expect(Users.hasMany).to.have.been.calledWith(CoursePreference);
    expect(Users.hasMany).to.have.been.calledWith(UploadedDocument);
  });

  checkModelName(Users)('User');

  ['appId', 'email', 'password', 'cnic', 'isVerified', 'otp', 'isAdmin'].forEach(checkPropertyExists(users));
});
