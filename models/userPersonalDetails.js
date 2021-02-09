var { STRING, INTEGER } = require('sequelize').DataTypes;
var db = require('../config/database');

var PhoneNumbers = db.define(
  'phoneNumber',
  {
    personalNumber: { type: STRING },
    optionalNumber: { type: STRING },
  },
  { tableName: 'phoneNumbers', timestamps: false, createdAt: false },
);

var Address = db.define(
  'address',
  {
    mailingAddress: { type: STRING },
    residentialAddress: { type: STRING },
  },
  { freezeTableName: true, timestamps: false, createdAt: false },
);

var Details = db.define(
  'detail',
  {
    name: { type: STRING },
    fatherName: { type: STRING },
    dob: { type: STRING },
    domicile: { type: STRING },
    religion: { type: STRING },
    image: { type: STRING },
    entryYear: { type: INTEGER },
    courseCategory: { type: STRING },
  },
  { tableName: 'details', timestamps: true, createdAt: true },
);

module.exports = {
  Details,
  Address,
  PhoneNumbers,
};
