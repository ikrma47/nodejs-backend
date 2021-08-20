function UserAcademicRecordModel(sequelize, DataTypes) {
  const UserAcademicRecords = sequelize.define(
    'userAcademicRecord',
    {},
    { tableName: 'userAcademicRecords', timestamps: true, createdAt: true },
  );
  UserAcademicRecords.associate = function association(model) {
    UserAcademicRecords.belongsTo(model.academics);
    UserAcademicRecords.belongsTo(model.examYear);
    UserAcademicRecords.belongsTo(model.User, {
      targetKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });
  };
  return UserAcademicRecords;
}

module.exports = UserAcademicRecordModel;
