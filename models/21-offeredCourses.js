function OfferedCourseModel(sequelize, DataTypes) {
  const OfferedCourse = sequelize.define('offeredCourse', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  OfferedCourse.associate = function association(model) {
    OfferedCourse.belongsTo(model.semesterCourse);
    OfferedCourse.belongsTo(model.semesterDetail);
  };
  return OfferedCourse;
}

module.exports = OfferedCourseModel;
