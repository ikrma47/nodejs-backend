function SemesterEnrollmentModel(sequelize, DataTypes) {
  const semesterEnrollment = sequelize.define('semesterEnrollment', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  semesterEnrollment.associate = function association(model) {
    semesterEnrollment.belongsTo(model.semesterDetail);
    semesterEnrollment.belongsTo(model.User, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false,
      },
    });
  };
  return semesterEnrollment;
}
module.exports = SemesterEnrollmentModel;
