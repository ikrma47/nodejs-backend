function SemesterCourseModel(sequelize, DataTypes) {
  const semesterCourse = sequelize.define('semesterCourse', {
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

  semesterCourse.associate = function association(model) {
    semesterCourse.belongsTo(model.departmentCourse);
    semesterCourse.hasMany(model.offeredCourse);
  };
  return semesterCourse;
}

module.exports = SemesterCourseModel;
