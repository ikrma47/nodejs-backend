function UserAcademicRecordModel(sequelize, DataTypes) {
  const userAcademicRecord = sequelize.define(
    'userAcademicRecord',
    {},
    { tableName: 'userAcademicRecords', timestamps: true, createdAt: true },
  );
  userAcademicRecord.associate = function association(model) {
    userAcademicRecord.belongsTo(model.academics);
    userAcademicRecord.belongsTo(model.examYear);
    userAcademicRecord.belongsTo(model.User, {
      targetKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });
  };
  return userAcademicRecord;
}

module.exports = UserAcademicRecordModel;
