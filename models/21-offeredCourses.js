function OfferedCourseModel(sequelize, DataTypes) {
  const offeredCourse = sequelize.define('offeredCourse', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  offeredCourse.associate = function association(model) {
    offeredCourse.belongsTo(model.semesterCourse);
    offeredCourse.belongsTo(model.semesterDetail);
  };
  return offeredCourse;
}

module.exports = OfferedCourseModel;
