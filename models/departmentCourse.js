function DepartmentCourseModel(sequelize, DataTypes) {
  const DepartmentCourse = sequelize.define(
    'departmentCourse',
    {
      id: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      courseCategory: { type: DataTypes.STRING, allowNull: false },
    },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );

  DepartmentCourse.associate = function association(model) {
    DepartmentCourse.belongsTo(model.Departments);
    DepartmentCourse.belongsTo(model.Courses);
    DepartmentCourse.hasMany(model.SemesterDetail);
    DepartmentCourse.hasMany(model.SemesterCourse);
    DepartmentCourse.hasMany(model.OfferedProgram);
  };
  return DepartmentCourse;
}

module.exports = DepartmentCourseModel;
