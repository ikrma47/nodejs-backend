function UploadDocumentModel(sequelize, DataTypes) {
  const uploadedDocument = sequelize.define(
    'uploadedDocument',
    {
      cnicFront: { type: DataTypes.STRING },
      cnicBack: { type: DataTypes.STRING },
      matricCertificate: { type: DataTypes.STRING },
      intermediateCertificate: { type: DataTypes.STRING },
      firstSemesterDmc: { type: DataTypes.STRING },
      secondSemesterDmc: { type: DataTypes.STRING },
      thirdSemesterDmc: { type: DataTypes.STRING },
      fourthSemesterDmc: { type: DataTypes.STRING },
      fifthSemesterDmc: { type: DataTypes.STRING },
      sixthSemesterDmc: { type: DataTypes.STRING },
      seventhSemesterDmc: { type: DataTypes.STRING },
      eighthSemesterDmc: { type: DataTypes.STRING },
      bsCertificate: { type: DataTypes.STRING },
    },
    { tableName: 'uploadedDocuments', timestamps: true, createdAt: true },
  );

  uploadedDocument.associate = function association(model) {
    uploadedDocument.belongsTo(model.User, {
      targetKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });
  };

  return uploadedDocument;
}

module.exports = UploadDocumentModel;
