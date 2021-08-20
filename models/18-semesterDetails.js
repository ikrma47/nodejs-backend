function SemesterDetailModel(sequelize, DataTypes) {
  const semesterDetail = sequelize.define('semesterDetail', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  semesterDetail.associate = function association(model) {
    semesterDetail.belongsTo(model.batch);
    semesterDetail.belongsTo(model.semester);
    semesterDetail.belongsTo(model.academicTerm);
    semesterDetail.belongsTo(model.departmentCourse);
    semesterDetail.hasMany(model.offeredCourse);
    semesterDetail.hasMany(model.semesterEnrollment);
  };

  return semesterDetail;
}

module.exports = SemesterDetailModel;
