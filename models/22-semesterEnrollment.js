function SemesterEnrollmentModel(sequelize, DataTypes) {
  const SemesterEnrollment = sequelize.define('semesterEnrollment', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  SemesterEnrollment.associate = function association(model) {
    SemesterEnrollment.belongsTo(model.semesterDetail);
    SemesterEnrollment.belongsTo(model.User, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false,
      },
    });
  };
  return SemesterEnrollment;
}
module.exports = SemesterEnrollmentModel;
