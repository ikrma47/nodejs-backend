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
    SemesterDetail.belongsTo(model.Batch);
    SemesterDetail.belongsTo(model.Semester);
    SemesterDetail.belongsTo(model.AcademicTerm);
    SemesterDetail.belongsTo(model.DepartmentCourse);
    SemesterDetail.hasMany(model.OfferedCourse);
    SemesterDetail.hasMany(model.SemesterEnrollment);
  };

  return SemesterDetail;
}

module.exports = SemesterDetailModel;
