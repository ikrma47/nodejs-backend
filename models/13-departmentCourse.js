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
    DepartmentCourse.belongsTo(model.department);
    DepartmentCourse.belongsTo(model.course);
    DepartmentCourse.hasMany(model.semesterDetail);
    DepartmentCourse.hasMany(model.semesterCourse);
    DepartmentCourse.hasMany(model.offeredProgram);
  };
  return DepartmentCourse;
}

module.exports = DepartmentCourseModel;
