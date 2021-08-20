function UserAcademicRecordModel(sequelize, DataTypes) {
  const UserAcademicRecords = sequelize.define(
    'userAcademicRecord',
    {},
    { tableName: 'userAcademicRecords', timestamps: true, createdAt: true },
  );
  UserAcademicRecords.associate = function association(model) {
    UserAcademicRecords.belongsTo(model.Academics);
    UserAcademicRecords.belongsTo(model.ExamYears);
    UserAcademicRecords.belongsTo(model.Users, {
      targetKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });
  };
  return UserAcademicRecords;
}

module.exports = UserAcademicRecordModel;
