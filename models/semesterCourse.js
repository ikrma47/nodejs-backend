function SemesterCourseModel(sequelize, DataTypes) {
  const SemesterCourse = sequelize.define('semesterCourse', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creditHours: {
      type: DataTypes.INTEGER,
    },
    isUniversityElective: {
      type: DataTypes.BOOLEAN,
    },
    isStudentElective: {
      type: DataTypes.BOOLEAN,
    },
  });

  SemesterCourse.associate = function association(model) {
    SemesterCourse.belongsTo(model.DepartmentCourse);
    SemesterCourse.hasMany(model.OfferedCourse);
  };
  return SemesterCourse;
}

module.exports = SemesterCourseModel;
