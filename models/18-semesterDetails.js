function SemesterDetailModel(sequelize, DataTypes) {
  const SemesterDetail = sequelize.define('semesterDetail', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  SemesterDetail.associate = function association(model) {
    SemesterDetail.belongsTo(model.batch);
    SemesterDetail.belongsTo(model.semester);
    SemesterDetail.belongsTo(model.academicTerm);
    SemesterDetail.belongsTo(model.departmentCourse);
    SemesterDetail.hasMany(model.offeredCourse);
    SemesterDetail.hasMany(model.semesterEnrollment);
  };

  return SemesterDetail;
}

module.exports = SemesterDetailModel;
