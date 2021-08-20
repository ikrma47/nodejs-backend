function DepartmentCourseModel(sequelize, DataTypes) {
  const departmentCourse = sequelize.define(
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

  departmentCourse.associate = function association(model) {
    departmentCourse.belongsTo(model.department);
    departmentCourse.belongsTo(model.course);
    departmentCourse.hasMany(model.semesterDetail);
    departmentCourse.hasMany(model.semesterCourse);
    departmentCourse.hasMany(model.offeredProgram);
  };
  return departmentCourse;
}

module.exports = DepartmentCourseModel;
