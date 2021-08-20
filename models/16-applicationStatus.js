function ApplicationStatusModel(sequelize, DataTypes) {
  const ApplicationStatus = sequelize.define('applicationStatus',
    {
      isSubmitted: { type: DataTypes.BOOLEAN, defaultValue: false },
      isAccepted: { type: DataTypes.BOOLEAN, defaultValue: false },
      comments: { type: DataTypes.STRING, allowNull: true },
      isProfile: { type: DataTypes.BOOLEAN, defaultValue: false },
      isCourseCategory: { type: DataTypes.BOOLEAN, defaultValue: false },
      isFirstYear: { type: DataTypes.BOOLEAN, defaultValue: false },
      isSecondYear: { type: DataTypes.BOOLEAN, defaultValue: false },
      isThirdYear: { type: DataTypes.BOOLEAN, defaultValue: false },
      isFinalYear: { type: DataTypes.BOOLEAN, defaultValue: false },
      isGAT: { type: DataTypes.BOOLEAN, defaultValue: false },
      isMS: { type: DataTypes.BOOLEAN, defaultValue: false },
      isExperience: { type: DataTypes.BOOLEAN, defaultValue: false },
      isPreference: { type: DataTypes.BOOLEAN, defaultValue: false },
      isCnicFront: { type: DataTypes.BOOLEAN, defaultValue: false },
      isCnicBack: { type: DataTypes.BOOLEAN, defaultValue: false },
      isMatricCertificate: { type: DataTypes.BOOLEAN, defaultValue: false },
      isIntermediateCertificate: { type: DataTypes.BOOLEAN, defaultValue: false },
      isFirstSemesterDmc: { type: DataTypes.BOOLEAN, defaultValue: false },
      isSecondSemesterDmc: { type: DataTypes.BOOLEAN, defaultValue: false },
      isThirdSemesterDmc: { type: DataTypes.BOOLEAN, defaultValue: false },
      isFourthSemesterDmc: { type: DataTypes.BOOLEAN, defaultValue: false },
      isFifthSemesterDmc: { type: DataTypes.BOOLEAN, defaultValue: false },
      isSixthSemesterDmc: { type: DataTypes.BOOLEAN, defaultValue: false },
      isSeventhSemesterDmc: { type: DataTypes.BOOLEAN, defaultValue: false },
      isEighthSemesterDmc: { type: DataTypes.BOOLEAN, defaultValue: false },
      isBsCertificate: { type: DataTypes.BOOLEAN, defaultValue: false },
      acceptedBy: { type: DataTypes.STRING },
      rejectedBy: { type: DataTypes.STRING },
    },
    { freezeTableName: true, createdAt: true, updatedAt: true });

  ApplicationStatus.associate = function association(model) {
    ApplicationStatus.belongsTo(model.User, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
  };

  return ApplicationStatus;
}
module.exports = ApplicationStatusModel;
