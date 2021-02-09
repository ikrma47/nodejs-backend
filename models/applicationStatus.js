var { BOOLEAN, STRING } = require('sequelize').DataTypes;
var db = require('../config/database');

var ApplicationStatus = db.define('applicationStatus',
  {
    isSubmitted: { type: BOOLEAN, defaultValue: false },
    isAccepted: { type: BOOLEAN, defaultValue: false },
    comments: { type: STRING, allowNull: true },
    isProfile: { type: BOOLEAN, defaultValue: false },
    isCourseCategory: { type: BOOLEAN, defaultValue: false },
    isFirstYear: { type: BOOLEAN, defaultValue: false },
    isSecondYear: { type: BOOLEAN, defaultValue: false },
    isThirdYear: { type: BOOLEAN, defaultValue: false },
    isFinalYear: { type: BOOLEAN, defaultValue: false },
    isGAT: { type: BOOLEAN, defaultValue: false },
    isMS: { type: BOOLEAN, defaultValue: false },
    isExperience: { type: BOOLEAN, defaultValue: false },
    isPreference: { type: BOOLEAN, defaultValue: false },
    isCnicFront: { type: BOOLEAN, defaultValue: false },
    isCnicBack: { type: BOOLEAN, defaultValue: false },
    isMatricCertificate: { type: BOOLEAN, defaultValue: false },
    isIntermediateCertificate: { type: BOOLEAN, defaultValue: false },
    isFirstSemesterDmc: { type: BOOLEAN, defaultValue: false },
    isSecondSemesterDmc: { type: BOOLEAN, defaultValue: false },
    isThirdSemesterDmc: { type: BOOLEAN, defaultValue: false },
    isFourthSemesterDmc: { type: BOOLEAN, defaultValue: false },
    isFifthSemesterDmc: { type: BOOLEAN, defaultValue: false },
    isSixthSemesterDmc: { type: BOOLEAN, defaultValue: false },
    isSeventhSemesterDmc: { type: BOOLEAN, defaultValue: false },
    isEighthSemesterDmc: { type: BOOLEAN, defaultValue: false },
    isBsCertificate: { type: BOOLEAN, defaultValue: false },
  },
  { freezeTableName: true, createdAt: true, updatedAt: true });

module.exports = ApplicationStatus;
