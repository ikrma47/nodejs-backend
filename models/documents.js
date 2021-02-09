var { STRING } = require('sequelize').DataTypes;
var db = require('../config/database');

var UploadedDocument = db.define(
  'uploadedDocument',
  {
    cnicFront: { type: STRING },
    cnicBack: { type: STRING },
    matricCertificate: { type: STRING },
    intermediateCertificate: { type: STRING },
    firstSemesterDmc: { type: STRING },
    secondSemesterDmc: { type: STRING },
    thirdSemesterDmc: { type: STRING },
    fourthSemesterDmc: { type: STRING },
    fifthSemesterDmc: { type: STRING },
    sixthSemesterDmc: { type: STRING },
    seventhSemesterDmc: { type: STRING },
    eighthSemesterDmc: { type: STRING },
    bsCertificate: { type: STRING },
  },
  { tableName: 'uploadedDocuments', timestamps: true, createdAt: true },
);

module.exports = UploadedDocument;
